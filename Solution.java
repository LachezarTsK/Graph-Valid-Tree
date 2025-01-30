
import java.util.Arrays;
import java.util.stream.IntStream;

public class Solution {

    public boolean validTree(int numberOfNodes, int[][] edges) {
        if (edges.length < numberOfNodes - 1) {
            return false;
        }

        UnionFind unionFind = new UnionFind(numberOfNodes);
        for (int[] edge : edges) {
            if (!unionFind.joinByRank(edge[0], edge[1])) {
                return false;
            }
        }

        return unionFind.allComponentsAreConnectedWithoutCycles();
    }
}

class UnionFind {

    private final int[] parent;
    private final int[] rank;
    private int numberOfGroupsWithConnectedComponents;

    UnionFind(int numberOfComponents) {
        parent = IntStream.range(0, numberOfComponents).toArray();
        rank = new int[numberOfComponents];
        Arrays.fill(rank, 1);
        numberOfGroupsWithConnectedComponents = numberOfComponents;
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    boolean joinByRank(int indexOne, int indexTwo) {
        int first = findParent(indexOne);
        int second = findParent(indexTwo);

        if (cycleFound(first, second)) {
            return false;
        }

        --numberOfGroupsWithConnectedComponents;

        if (rank[first] > rank[second]) {
            parent[second] = first;
            rank[first] += rank[second];
        } else {
            parent[first] = second;
            rank[second] += rank[first];
        }
        return true;
    }

    private boolean cycleFound(int parentFirst, int parentSecond) {
        return parentFirst == parentSecond;
    }

    public boolean allComponentsAreConnectedWithoutCycles() {
        return numberOfGroupsWithConnectedComponents == 1;
    }
}
