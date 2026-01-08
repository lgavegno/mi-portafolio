# 🌳 Árbol de Componentes

Este mapa refleja la jerarquía real de renderizado de la aplicación.

```mermaid
graph TD
    Root[main.jsx] --> App[App.jsx]
    
    subgraph Routing
    App --> Router[BrowserRouter]
    Router --> MainLayout[MainLayout.jsx]
    end

    subgraph Layout
    MainLayout --> Header[Header.jsx]
    MainLayout --> PageTrans[PageTransition.jsx]
    MainLayout --> Footer[Footer.jsx]
    MainLayout --> BackTop[BackToTop.jsx]
    end

    subgraph Pages & Features
    PageTrans --> Home[Home Sections]
    PageTrans --> BlogDetail[BlogPostDetail.jsx]

    Home --> Hero[HeroBanner.jsx]
    Home --> Services[Services.jsx]
    Home --> Works[Works.jsx]
    Home --> Contact[Contact.jsx]
    end

    subgraph Components Desglose
    Hero --> NeuralBg[NeuralNetworkBackground.jsx]
    Hero --> BlogPrev[BlogPreview.jsx]
    
    BlogPrev --> BlogCard[BlogCard.jsx]
    BlogDetail --> BlogCard

    Works --> ProjCard[ProjectCard.jsx]
    ProjCard --> ProgressBar[ProgressBar.jsx]

    Contact --> UI_Button[Button.jsx]
    end
```

## 📦 Leyenda
- **Layouts**: Estructuran el contenido global.
- **Features**: Módulos funcionales grandes.
- **UI Components**: Componentes visuales pequeños y reutilizables.
