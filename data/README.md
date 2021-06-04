# Tracing Patient Zero

### Setup Neo4j database

There are 3 ways you can setup database :

1. Neo4j [Desktop](https://neo4j.com/download/)
2. Neo4j [Sandbox](https://sandbox.neo4j.com/) (cloud database will be available up to 10 days)
3. Neo4j [Aura](https://neo4j.com/cloud/aura/) (database as a service)

After that run this query in neo4j browser: 

```
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRuerMkt-ZqpF3v14cbnblIr3NqguYMK4c5XP2RFLKGBd_MGmmGLI5VMeOPWhM7uhfLpdfekCg6Jc2m/pub?gid=36400634&single=true&output=csv' AS row

CREATE (:User {id: toInteger(row.user_id), infected_by: toInteger(row.infected_by), level:toInteger(row.level)})
```
