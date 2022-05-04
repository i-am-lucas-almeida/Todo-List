# Todo List | Registre suas tarefas

![todo-com netlify app_ (4)](https://user-images.githubusercontent.com/77863766/166617762-a3210a16-470c-42dd-ac17-ff903f06e9ee.png)
![todo-com netlify app_ (3)](https://user-images.githubusercontent.com/77863766/166617766-8e4dc9a2-0ac5-4602-88c0-0488787d0d9e.png)
![todo-com netlify app_ (2)](https://user-images.githubusercontent.com/77863766/166617773-85c522d2-f8e6-459f-bf0b-25e50030dd34.png)

## Sobre

Um todo list desenvolvido em JavaScript que permite ao usuário criar, editar e excluír tarefas. Além de poder escolher entre os temas claro/escuro,
o usuário tem a comodidade de salvar suas tarefas e preferência de tema no localStorage.

## Ferramentas Usadas

* Html, Css, JavaScript
* [Animate.css](https://animate.style/)

## Detalhes do desenvolvimento

O site foi desenvolvido com uso de html básico, css, javaScript e da biblioteca [Animate.css](https://animate.style/).
Aliado, a técnicas de responsividade e código limpo. Todas os dados ficam salvos no localStorage.

### Uma maneira simples de criar um tema claro/escuro

Usando o atributo `data`, podemos armazenar o estado padrão de nossa aplicação.

```
  <html lang="pt-br" data-theme="dark">
````

Através do `:root` no CSS podemos armazenar os valores correspondentes aos temas que posteriormente podem ser alterados através do `JavaScript`

```
  [data-theme='dark'] {
  
    --backg-color: #161722;
    --container-color: #25273c;
    --font-color: #d1d1d1;

    --backg-image-desktop: url(/images/bg-desktop-dark.jpg);
    --theme-icon: url(/images/icon-sun.svg);

}

[data-theme='light'] {

    --backg-color: #e4e5f1;
    --container-color: #fafafa;
    --font-color: #25273c;

    --backg-image-desktop: url(/images/bg-desktop-light.jpg);
    --theme-icon: url(/images/icon-moon.svg);

}
```

Através do `JavaScript` só precisamos verificar para qual tema nosso `DOM` precisa trocar. Usamos para isso o `SetAtribute()` para modificar o valor armazenado 
no nosso atributo `data`

```
function changeTheme() {

    //recuperamos o valor armazenado no localStorage
    const theme = localStorage.getItem('theme');

    if(theme === 'dark') {

        document.documentElement.setAttribute('data-theme', 'dark');

    } else if(theme === 'light') {

        document.documentElement.setAttribute('data-theme', 'light');

    }

}

btnTheme.addEventListener('click', changeTheme());
```

Bem simples, não é? 😁

## Conclusão

Essa foi minha primeira experiência desenvolvendo um todo app, então futuramente pretendo fazer melhorias e criar um app mais completo.
Estou sempre aberto a ideias e sugestões então, por favor, deixe-me saber se você tem algo a dizer!

## Melhorias Futuras

- [ ] Migrar para React;
- [ ] Dar um  up no design;
- [ ] Adicionar animações quando as tarefas forem criadas e excluídas;
- [ ] A capacidade de favoritar uma tarefa e fazer com que ela apareça no topo da lista;
- [ ] A capacidade de criar grupos ou categorias de tarefas;
- [ ] A capacidade de reorganizar as tarefas (drag and drop);
- [ ] Salvar as tarefas em um banco de dados externo;
- [ ] Adicionar login para usuários;

## Links

* Visite o site: [https://todolist.com](https://todo-com.netlify.app/)
