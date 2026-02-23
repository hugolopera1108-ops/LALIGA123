# LALIGA123
## Resolución de Conflictos
Para cumplir con los requisitos del proyecto, se generó un conflicto de fusión (merge conflict) de forma intencionada:

1. **Contexto:** Se modificó la primera línea del archivo `README.md` en dos ramas distintas de forma simultánea.
   - En la rama **`main`**, se cambió el título a: `# LALIGA - ENTREGA FINAL JAN`.
   - En la rama **`feature-estilos`**, se cambió el mismo título a: `# FootballHub v2.0 - Jan Guinovart (ASIX)`.
2. **El Conflicto:** Al intentar realizar un `git merge feature-estilos` desde la rama `main`, Git detectó que la misma línea tenía contenidos diferentes y no pudo decidir cuál mantener, deteniendo el proceso de unión.
3. **Resolución:** Se procedió a una resolución manual utilizando Visual Studio Code. Se eliminaron las marcas de conflicto (`&lt;&lt;&lt;&lt;&lt;&lt;&lt;`, `=======`, `>>>>>>>`) y se decidió dejar un título unificado: `# FootballHub - Proyecto La Liga`. Finalmente, se realizó un `git add` y un `git commit` para cerrar la fusión.