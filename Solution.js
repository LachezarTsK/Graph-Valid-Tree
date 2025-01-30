
/**
 * @param {number} numberOfNodes
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (numberOfNodes, edges) {
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

    #parent;
    #rank;
    #numberOfGroupsWithConnectedComponents;

    /**
     * @param {number} numberOfComponents
     */
    constructor(numberOfComponents) {
        this.parent = Array.from(new Array(numberOfComponents).keys());
        this.rank = new Array(numberOfComponents).fill(1);
        this.numberOfGroupsWithConnectedComponents = numberOfComponents;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     * @return {boolean}
     */
    joinByRank(indexOne, indexTwo) {
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

    /**
     * @param {number} parentFirst
     * @param {number} parentSecond
     * @return {boolean}
     */
    cycleFound(parentFirst, parentSecond) {
        return parentFirst === parentSecond;
    }

    /**
     * @return {boolean}
     */
    allComponentsAreConnectedWithoutCycles() {
        return this.numberOfGroupsWithConnectedComponents === 1;
    }
}
