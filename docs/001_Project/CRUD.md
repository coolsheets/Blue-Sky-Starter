```
mermaid

graph LR
  subgraph Client Components
    VRCopy["VideoReactionCard copy.jsx"]
    VRC["VideoReactionCard.jsx"]
  end

  subgraph Server Routes
    authOld["authOld.js"]
    videos["videos.js"]
    userRoutes["userRoutes.js"]
    userRoutesCopy["userRoutes copy.js"]
    frontPageRoutes["frontPageRoutes.js"]
    interactionsRoute["interactions.js"]
    superHeroRoutes["superHeroRoutes.js"]
  end

  subgraph Controllers
    interactionsCtrl["interactionsControllers.js"]
  end

  subgraph Models
    citiesModel["cities.js"]
    usersModel["users.js"]
    superheroesModel["superheroes.js"]
    reactionsModel["reactions.js"]
    cameraLocationsModel["cameralocations.js"]
  end

  subgraph CRUD Operations
    CRUDCreate("Create")
    CRUDRead("Read")
    CRUDUpdate("Update")
    CRUDDelete("Delete")
  end

  %% Client
  VRCopy -->|Read| CRUDRead
  VRC     -->|Read| CRUDRead

  %% Routes
  authOld        -->|Read|   CRUDRead
  videos         -->|Read|   CRUDRead
  videos         -->|Update| CRUDUpdate
  userRoutes     -->|Read|   CRUDRead
  userRoutes     -->|Create| CRUDCreate
  userRoutesCopy -->|Read|   CRUDRead
  userRoutesCopy -->|Create| CRUDCreate
  frontPageRoutes-->|Delete| CRUDDelete
  interactionsRoute -->|Read|   CRUDRead
  interactionsRoute -->|Update| CRUDUpdate
  interactionsRoute -->|Delete| CRUDDelete
  superHeroRoutes   -->|Delete| CRUDDelete

  %% Controller
  interactionsCtrl -->|Update| CRUDUpdate

  %% Models
  citiesModel          -->|Create| CRUDCreate
  citiesModel          -->|Read|   CRUDRead
  usersModel           -->|Create| CRUDCreate
  usersModel           -->|Read|   CRUDRead
  superheroesModel     -->|Create| CRUDCreate
  superheroesModel     -->|Read|   CRUDRead
  reactionsModel       -->|Create| CRUDCreate
  reactionsModel       -->|Read|   CRUDRead
  cameraLocationsModel -->|Create| CRUDCreate
  cameraLocationsModel -->|Read|   CRUDRead
```