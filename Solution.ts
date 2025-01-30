
function validTree(numberOfNodes: number, edges: number[][]): boolean {
    if (edges.length < numberOfNodes - 1) {
        return false;
    }

    const unionFind = new UnionFind(numberOfNodes);
    for (let [nodeOne, nodeTwo] of edges) {
        if (!unionFind.joinByRank(nodeOne, nodeTwo)) {
            return false;
        }
    }

    return unionFind.allComponentsAreConnectedWithoutCycles();
};

class UnionFind {

    private parent: number[];
    private rank: number[];
    private numberOfGroupsWithConnectedComponents: number;

    constructor(numberOfComponents: number) {
        this.parent = Array.from(new Array(numberOfComponents).keys());
        this.rank = new Array(numberOfComponents).fill(1);
        this.numberOfGroupsWithConnectedComponents = numberOfComponents;
    }

    findParent(index: number): number {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(indexOne: number, indexTwo: number): boolean {
        const first = this.findParent(indexOne);
        const second = this.findParent(indexTwo);

        if (this.cycleFound(first, second)) {
            return false;
        }

        --this.numberOfGroupsWithConnectedComponents;

        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = first;
            this.rank[first] += this.rank[second];
        } else {
            this.parent[first] = second;
            this.rank[second] += this.rank[first];
        }
        return true;
    }


    cycleFound(parentFirst: number, parentSecond: number): boolean {
        return parentFirst === parentSecond;
    }

    allComponentsAreConnectedWithoutCycles(): boolean {
        return this.numberOfGroupsWithConnectedComponents === 1;
    }
}
