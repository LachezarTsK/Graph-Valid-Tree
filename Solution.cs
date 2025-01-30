
using System;
using System.Linq;

public class Solution
{
    public bool ValidTree(int numberOfNodes, int[][] edges)
    {
        if (edges.Length < numberOfNodes - 1)
        {
            return false;
        }

        UnionFind unionFind = new UnionFind(numberOfNodes);
        foreach (int[] edge in edges)
        {
            if (!unionFind.joinByRank(edge[0], edge[1]))
            {
                return false;
            }
        }

        return unionFind.allComponentsAreConnectedWithoutCycles();
    }

}
class UnionFind
{

    private readonly int[] parent;
    private readonly int[] rank;
    private int numberOfGroupsWithConnectedComponents;

    public UnionFind(int numberOfComponents)
    {
        parent = Enumerable.Range(0, numberOfComponents).ToArray<int>();
        rank = new int[numberOfComponents];
        Array.Fill(rank, 1);
        numberOfGroupsWithConnectedComponents = numberOfComponents;
    }

    public int findParent(int index)
    {
        if (parent[index] != index)
        {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    public bool joinByRank(int indexOne, int indexTwo)
    {
        int first = findParent(indexOne);
        int second = findParent(indexTwo);

        if (cycleFound(first, second))
        {
            return false;
        }

        --numberOfGroupsWithConnectedComponents;

        if (rank[first] > rank[second])
        {
            parent[second] = first;
            rank[first] += rank[second];
        }
        else
        {
            parent[first] = second;
            rank[second] += rank[first];
        }
        return true;
    }

    private bool cycleFound(int parentFirst, int parentSecond)
    {
        return parentFirst == parentSecond;
    }

    public bool allComponentsAreConnectedWithoutCycles()
    {
        return numberOfGroupsWithConnectedComponents == 1;
    }
}
