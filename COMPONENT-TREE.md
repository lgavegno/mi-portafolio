# 🌳 Árbol de Componentes

Este mapa refleja la jerarquía real de renderizado de la aplicación (v2.0).

```mermaid
graph TD
    Root[main.jsx] --> App[App.jsx]
    
    subgraph Routing
    App --> Routes
    Routes --> HomeRoute[Route: /]
    Routes --> BlogRoute[Route: /blog/*]
    Routes --> ProjectRoute[Route: /proyecto/:id]
    end

    subgraph Home Page
    HomeRoute --> MainLayoutWrapper
    MainLayoutWrapper --> MainLayout[MainLayout.jsx]
    MainLayout --> Header[Header.jsx]
    
    MainLayout --> Landing[HomeSections]
    Landing --> Hero[HeroBanner.jsx]
    Landing --> About[About.jsx]
    Landing --> Skills[SkillsGrid.jsx]
    Landing --> Services[Services.jsx]
    Landing --> Works[Works.jsx]
    Landing --> BlogPrev[BlogPreview.jsx]
    Landing --> Contact[Contact.jsx]
    
    MainLayout --> Footer[Footer.jsx]
    end

    subgraph Blog System
    BlogRoute --> BlogLayout[BlogLayout.jsx]
    BlogLayout --> Outlet
    
    Outlet --> BlogIndex[BlogIndex.jsx]
    Outlet --> BlogPost[BlogPostDetail.jsx]

    BlogIndex --> CatFilter[CategoryFilter]
    BlogIndex --> FeatPost[FeaturedPost]
    BlogIndex --> PostGrid[PostGrid]
    
    BlogPost --> ShareBtn[ShareButton]
    BlogPost --> ProjectDetail[ProjectDetail.jsx]
    end

    subgraph Feature Details
    Hero --> VideoMobile[Video (Mobile Only)]
    Hero --> Wireframe[WireframeGeometry (Desktop)]
    Hero --> Ticker[TechnicalTicker]

    Services --> Carousel3D
    
    Works --> ProjectCard
    
    Contact --> ContactForm
    end
```

## 📦 Leyenda
- **Layouts**: Estructuran el contenido global.
- **Features**: Módulos funcionales grandes.
- **Components**: Piezas visuales reutilizables.
