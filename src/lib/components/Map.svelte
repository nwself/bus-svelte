<script>
  import network from "$lib/data/graph.json";
  import Node from "$lib/components/Node.svelte";
  import Edge from "$lib/components/Edge.svelte";
  import TypeMenu from "$lib/components/TypeMenu.svelte";
</script>

{#each network.edges as {source, target, eid}}
  <Edge {eid} source={network.nodes[source]} target={network.nodes[target]}/>
{/each}

{#each network.nodes as {x, y, nid, type, buildings=[]}}
  <Node {x} {y} {nid} {type} {buildings}/>
{/each}

<TypeMenu/>
