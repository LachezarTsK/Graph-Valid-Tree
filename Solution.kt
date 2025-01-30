
class Solution {

    fun validTree(numberOfNodes: Int, edges: Array<IntArray>): Boolean {
        if (edges.size < numberOfNodes - 1) {
            return false
        }

        val unionFind = UnionFind(numberOfNodes)
        for ((nodeOne, nodeTwo) in edges) {
            if (!unionFind.joinByRank(nodeOne, nodeTwo)) {
                return false
            }
        }

        return unionFind.allComponentsAreConnectedWithoutCycles()
    }
}

class UnionFind(private val numberOfComponents: Int) {

    private val parent = IntArray(numberOfComponents) { n -> n }
    private var rank = IntArray(numberOfComponents) { 1 }
    private var numberOfGroupsWithConnectedComponents = numberOfComponents


    fun findParent(index: Int): Int {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index])
        }
        return parent[index]
    }

    fun joinByRank(indexOne: Int, indexTwo: Int): Boolean {
        val first = findParent(indexOne)
        val second = findParent(indexTwo)

        if (cycleFound(first, second)) {
            return false
        }

        --numberOfGroupsWithConnectedComponents

        if (rank[first] > rank[second]) {
            parent[second] = first
            rank[first] += rank[second]
        } else {
            parent[first] = second
            rank[second] += rank[first]
        }
        return true
    }

    private fun cycleFound(parentFirst: Int, parentSecond: Int): Boolean {
        return parentFirst == parentSecond
    }

    public fun allComponentsAreConnectedWithoutCycles(): Boolean {
        return numberOfGroupsWithConnectedComponents == 1
    }
}
