```mermaid;
flowchart LR;

    A[project_root] --> B[client];
    
    A --> C[server];

    B --> D[exclude];
    B --> E[node_modules];
    B --> F[public] --> videos;
    B --> G[src] --> assets;

    C --> H[cli];
    C --> I[data];
    C --> J[models];
    C --> K[node_modules];
    C --> L[routes];
    C --> db.js ----> M[(atlasdb)];
    C --> server.js --cors--> N[(vite_dev_server)]
```;