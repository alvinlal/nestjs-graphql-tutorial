import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  doesPathExist(nodes: any[], path: string[]) {
    if (!nodes) {
      return false;
    }

    const node = nodes.find((x) => x.name.value === path[0]);

    if (!node) {
      return false;
    }

    if (path.length === 1) {
      return true;
    }

    return this.doesPathExist(node.selectionSet.selections, path.slice(1));
  }
}
