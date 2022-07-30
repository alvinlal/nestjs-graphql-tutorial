import {
  ApolloServerPlugin,
  GraphQLServiceContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLSchema, separateOperations } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
export class ComplexityPlugin implements ApolloServerPlugin {
  private schema: GraphQLSchema;

  constructor(private maxComplexity: number) {}

  public async serverWillStart(service: GraphQLServiceContext) {
    this.schema = service.schema;
  }

  async requestDidStart(): Promise<GraphQLRequestListener> {
    return {
      didResolveOperation: async ({ request, document }) => {
        const complexity = getComplexity({
          schema: this.schema,
          query: request.operationName
            ? separateOperations(document)[request.operationName]
            : document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > this.maxComplexity) {
          throw new Error(
            `Sorry, too complicated query (complexity: ${complexity}, max complexity: ${this.maxComplexity})`,
          );
        }
      },
    };
  }
}
