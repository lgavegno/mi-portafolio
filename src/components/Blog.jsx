// src/components/Blog.jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Highlight active section in the sidebar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('#sidebar nav ul li a').forEach(link => {
            link.classList.remove('active');
          });
          const activeLink = document.querySelector(`#sidebar nav ul li a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, { rootMargin: "0px 0px -60% 0px", threshold: 0.1 });

    document.querySelectorAll('h2[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="blog-container pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Blog - Guía Simple de POO</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🧠 Cómo Entender la Programación Orientada a Objetos (POO) de Forma Simple</h1>
          <p className="text-xl opacity-90">Guía práctica para principiantes</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        <aside id="sidebar" className="md:w-1/4 h-fit sticky top-24 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <nav>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Índice</h3>
            <ul className="space-y-2">
              <li><a href="#que-es-poo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">⭐ ¿Qué es realmente la POO?</a></li>
              <li><a href="#clases" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🧱 1. Clases: Los moldes</a></li>
              <li><a href="#objetos" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🧍‍♂️ 2. Objetos: Las cosas reales</a></li>
              <li><a href="#metodos" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🔧 3. Métodos: Acciones de los objetos</a></li>
              <li><a href="#encapsulamiento" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🔒 4. Encapsulamiento: Proteger los datos</a></li>
              <li><a href="#herencia" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🧬 5. Herencia: Reutilizar código</a></li>
              <li><a href="#polimorfismo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🎭 6. Polimorfismo: Objetos que actúan distinto</a></li>
              <li><a href="#flujo-poo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🔄 7. ¿Cómo fluye la información en POO?</a></li>
            </ul>
          </nav>
        </aside>

        <main id="content" className="md:w-3/4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            La <strong className="text-blue-600 dark:text-blue-400">Programación Orientada a Objetos (POO)</strong> es uno de esos temas que, al principio, parece complejo. Pero cuando entendés su lógica interna, todo empieza a tener sentido. Este artículo está pensado para explicártelo con un enfoque práctico, visual y basado en la vida real, para que puedas aplicarlo al instante en tus proyectos.
          </p>

          <h2 id="que-es-poo" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">⭐ ¿Qué es realmente la POO?</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            La POO es una forma de organizar tu código como si estuvieras <strong>modelando objetos del mundo real</strong>.
          </p>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Podés imaginarla como una fábrica donde definís <strong>moldes (clases)</strong> y producís <strong>objetos individuales (instancias)</strong> que saben hacer cosas y guardan información.
          </p>

          <h2 id="clases" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🧱 1. Clases: Los moldes</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Una clase es una <strong>plantilla</strong>. No es un objeto real, sino una descripción de cómo debería ser.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`class Producto {\n  String nombre;\n  double precio;\n}`}
            </code>
          </pre>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            La clase no existe físicamente hasta que creás un objeto usando esa plantilla.
          </p>

          <h2 id="objetos" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🧍‍♂️ 2. Objetos: Las cosas reales</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Un objeto es una variable especial creada a partir de una clase.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`Producto p = new Producto();\np.nombre = "Mouse Gamer";\np.precio = 15000;`}
            </code>
          </pre>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Acá aparece la magia de POO: los objetos <strong>guardan datos</strong> y <strong>pueden ejecutar acciones</strong>.
          </p>

          <h2 id="metodos" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🔧 3. Métodos: Acciones de los objetos</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Los métodos son <strong>comportamientos</strong>, o sea, lo que un objeto puede hacer.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`class Producto {\n  String nombre;\n  double precio;\n  \n  void aplicarDescuento(double porcentaje) {\n    precio -= precio * porcentaje;\n  }\n}`}
            </code>
          </pre>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Ahora un objeto puede ejecutar:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              p.aplicarDescuento(0.10);
            </code>
          </pre>

          <h2 id="encapsulamiento" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🔒 4. Encapsulamiento: Proteger los datos</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Es la idea de no dejar que cualquiera modifique cualquier dato. Usamos <strong>private</strong> y <strong>getters/setters</strong>.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {`private double precio;\n\npublic double getPrecio() {\n  return precio;\n}\n\npublic void setPrecio(double precio) {\n  this.precio = precio;\n}`}
            </code>
          </pre>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Esto evita errores y mantiene al objeto "seguro".
          </p>

          <h2 id="herencia" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🧬 5. Herencia: Reutilizar código</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Una clase puede "<strong>heredar</strong>" de otra. Todo el código que no necesitas reescribir se reutiliza.
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Ejemplo clásico:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              class ProductoDigital extends Producto {'{\n  double pesoMB;\n}'}
            </code>
          </pre>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Ahora <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ProductoDigital</code> tiene todo de <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Producto</code> + lo suyo.
          </p>

          <h2 id="polimorfismo" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🎭 6. Polimorfismo: Objetos que actúan distinto</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Permite que varias clases distintas respondan de forma diferente al <strong>mismo método</strong>.
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Ejemplo: distintos tipos de productos calculan impuestos de forma distinta.
          </p>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              producto.calcularImpuesto();
            </code>
          </pre>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Cada clase puede tener su propia versión.
          </p>

          <h2 id="flujo-poo" className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🔄 7. ¿Cómo fluye la información en POO?</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Esto es lo que estabas buscando: un flujo claro y visual del camino que siguen los datos durante un proceso, por ejemplo, una compra.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">Flujo simplificado</h3>
          <div className="flow-chart space-y-2 mb-8">
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center font-medium">[Usuario completa el formulario]</div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">Los datos se guardan en variables temporales (input)</div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">Se crea un objeto "Compra"</div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
              Datos del usuario → Compra.nombreCliente<br />
              Productos → Compra.listaProductos<br />
              Precio → Compra.total
            </div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">Se ejecuta un método: <code className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">compra.confirmar()</code></div>
            <div className="text-center text-2xl text-blue-500">↓</div>
            <div className="flow-item p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">La compra se envía al sistema de almacenamiento (BD, archivo, API)</div>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">Explicado paso a paso:</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Entradas del usuario</strong> → se guardan en variables temporales.</li>
            <li>Con esas variables se <strong>crea un objeto</strong> (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Compra</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Producto</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Cliente</code>).</li>
            <li>El objeto <strong>almacena</strong> esos valores en sus atributos.</li>
            <li>Se <strong>ejecutan métodos</strong> (calcular total, validar, enviar).</li>
            <li>Finalmente el objeto se <strong>guarda o se transforma en datos persistentes</strong> (JSON, BD, archivo).</li>
          </ul>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Este flujo es exactamente cómo funciona la mayoría de las aplicaciones modernas.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">🧠 POO como forma de pensar</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            La POO no es solo sintaxis. Es una manera de diseñar:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
            <li>¿Qué cosas existen en mi sistema? → <strong>Clases</strong></li>
            <li>¿Qué datos deben guardar? → <strong>Atributos</strong></li>
            <li>¿Qué pueden hacer? → <strong>Métodos</strong></li>
            <li>¿Cómo se relacionan? → <strong>Herencia / Asociaciones</strong></li>
          </ul>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Cuando lográs verlo así, POO deja de ser teoría y se vuelve un mapa mental para crear sistemas <strong>claros, escalables y fáciles de mantener</strong>.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">💬 Conclusión</h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Aprender POO es aprender a <strong>modelar la realidad</strong>, no a memorizar código.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Blog;