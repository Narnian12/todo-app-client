(this["webpackJsonptodo-app-client"]=this["webpackJsonptodo-app-client"]||[]).push([[0],{101:function(n,e,t){"use strict";t.r(e);var i,a,c,d,o,r,j=t(5),s=t(26),b=t.n(s),u=(t(81),t(73)),O=t(114),l=t(116),f=t(117),h=t(115),g=t(70),m=t(72),p=t(15),x=t(1),v=t(118),C=t(28),y=t(30),T=Object(y.a)(i||(i=Object(C.a)(["\n  query GetTodoList {\n    getTodoList {\n      id\n      name\n      info\n      editing\n    }\n  }\n"]))),$=t(52),L=t(18),I=t(40),S=t(32),k=t(66),N=t(120);!function(n){n.Id="id",n.Name="name",n.Info="info"}(a||(a={}));var E,w=Object(y.a)(c||(c=Object(C.a)(["\n  mutation addTodo(\n    $",": String!,\n    $",": String!,\n    $",": String\n  ) {\n    addTodo(todo: {\n      id: $",",\n      name: $",",\n      info: $","\n    }) {\n      id\n      name\n      info\n      editing\n    }\n  }\n"])),a.Id,a.Name,a.Info,a.Id,a.Name,a.Info),A=Object(y.a)(d||(d=Object(C.a)(["\n  mutation deleteTodo($id: String!) {\n    deleteTodo(id: $id) {\n      id\n    }\n  }\n"]))),D=Object(y.a)(o||(o=Object(C.a)(["\n  mutation setEditing($id: String!, $editing: Boolean!) {\n    setEditing(id: $id, editing: $editing) {\n      id\n      name\n      info\n      editing\n    }\n  }\n"]))),B=Object(y.a)(r||(r=Object(C.a)(["\n  mutation updateTodo(\n    $",": String!,\n    $",": String!,\n    $",": String\n  ) {\n    updateTodo(todo: {\n      id: $",",\n      name: $",",\n      info: $","\n    }) {\n      id\n      name\n      info\n      editing\n    }\n  }\n"])),a.Id,a.Name,a.Info,a.Id,a.Name,a.Info),q=t(3),G=function(n){var e=n.todoList,t=n.setTodoList,i=Object(x.useState)(!1),c=Object(p.a)(i,2),d=c[0],o=c[1],r=Object(x.useState)(""),j=Object(p.a)(r,2),s=j[0],b=j[1],u=Object(x.useState)(""),O=Object(p.a)(u,2),l=O[0],f=O[1],h=Object(N.a)(w),g=Object(p.a)(h,1)[0],m=function(){b(""),f("")},v=function(){o(!1),m()};return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",margin:"10px 5px"},children:[Object(q.jsx)("h1",{children:"Todo List"}),Object(q.jsx)(S.a,{variant:"primary",onClick:function(){return o(!0)},children:"Add Todo"})]}),Object(q.jsxs)(I.a,{show:d,onHide:v,children:[Object(q.jsx)(I.a.Header,{closeButton:!0,children:Object(q.jsx)(I.a.Title,{children:"Add Todo"})}),Object(q.jsx)(I.a.Body,{children:Object(q.jsxs)("form",{className:"add",children:[Object(q.jsx)("label",{style:{margin:"0px 5px"},children:"Name"}),Object(q.jsx)("input",{value:s,onChange:function(n){return b(n.target.value)}}),Object(q.jsx)("label",{style:{margin:"0px 5px"},children:"Info"}),Object(q.jsx)("input",{value:l,onChange:function(n){return f(n.target.value)}})]})}),Object(q.jsxs)(I.a.Footer,{children:[Object(q.jsx)(S.a,{variant:"secondary",onClick:v,children:"Cancel"}),Object(q.jsx)(S.a,{variant:"primary",onClick:function(n){var i;n.preventDefault();var c={id:Object(k.v4)(),name:s,info:l,editing:!1};g({variables:(i={},Object(L.a)(i,a.Id,c.id),Object(L.a)(i,a.Name,c.name),Object(L.a)(i,a.Info,c.info),i)}),m(),t([].concat(Object($.a)(e),[c])),o(!1)},children:"Add"})]})]})]})},J=t(121),F=Object(y.a)(E||(E=Object(C.a)(["\n  subscription TodoChanged {\n    todoChanged {\n      type\n      data {\n        id\n        name\n        info\n        editing\n      }\n    }\n  }\n"]))),H=t(110),X=t(111),Z=t(112),z=t(113),P=(t(88),function(n){var e=n.todoList,t=n.setTodoList,i=Object(J.a)(F).data,a=Object(N.a)(A),c=Object(p.a)(a,1)[0],d=Object(N.a)(D),o=Object(p.a)(d,1)[0],r=Object(N.a)(B),s=Object(p.a)(r,1)[0];Object(x.useEffect)((function(){if(i)if("ADD"===i.todoChanged.type){var n=i.todoChanged.data;0===e.filter((function(e){return e.id===n.id})).length&&t([].concat(Object($.a)(e),[n]))}else if("UPDATE"===i.todoChanged.type){var a=i.todoChanged.data,c=e.filter((function(n){return n.id===a.id}))[0];a.name===c.name&&a.info===c.info||t(e.map((function(n){return n.id===a.id?{id:a.id,name:a.name,info:a.info,editing:!1}:n})))}else if("DELETE"===i.todoChanged.type){var d=i.todoChanged.data;1===e.filter((function(n){return n.id===d.id})).length&&t(e.filter((function(n){return n.id!==d.id})))}}),[i,e,t]);var b=Object(x.useState)(e.length>0?e.reduce((function(n,e){return n.editing?n:e.editing?e:{id:"",name:"",info:"",editing:!1}})):{id:"",name:"",info:"",editing:!1}),u=Object(p.a)(b,2),O=u[0],l=u[1],f=Object(x.useState)(!1),h=Object(p.a)(f,2),g=h[0],m=h[1],v=function(n,i){m(i),o({variables:{id:n,editing:i}}),t(e.map((function(e){if(e.id===n){var t=Object(j.a)(Object(j.a)({},e),{},{editing:i});return l(t),t}return e})))},C=function(n){return l(Object(j.a)(Object(j.a)({},O),{},{name:n.target.value}))},y=function(n){return l(Object(j.a)(Object(j.a)({},O),{},{info:n.target.value}))},T=function(){s({variables:{id:O.id,name:O.name,info:O.info}}),t(e.map((function(n){return n.id===O.id?{id:O.id,name:O.name,info:O.info,editing:!1}:n}))),m(!1)};return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsxs)("div",{className:"todoList header",children:[Object(q.jsx)("div",{children:"Name"}),Object(q.jsx)("div",{children:"Info"})]}),e.map((function(n){return n.editing?Object(q.jsxs)("div",{children:[Object(q.jsx)("hr",{}),Object(q.jsxs)("div",{className:"todoList",children:[Object(q.jsx)("input",{value:O.name,onChange:C}),Object(q.jsx)("input",{value:O.info,onChange:y}),Object(q.jsx)(S.a,{variant:"secondary",onClick:function(){return v(n.id,!1)},children:Object(q.jsx)(Z.a,{})}),Object(q.jsx)(S.a,{variant:"primary",onClick:T,children:Object(q.jsx)(z.a,{})})]})]},n.id):Object(q.jsxs)("div",{children:[Object(q.jsx)("hr",{}),Object(q.jsxs)("div",{className:"todoList",children:[Object(q.jsx)("div",{children:n.name}),Object(q.jsx)("div",{children:n.info}),Object(q.jsx)(S.a,{variant:"secondary",onClick:function(){return v(n.id,!0)},disabled:g,children:Object(q.jsx)(H.a,{})}),Object(q.jsx)(S.a,{variant:"secondary",onClick:function(){return i=n.id,c({variables:{id:i}}),void t(e.filter((function(n){return n.id!==i})));var i},children:Object(q.jsx)(X.a,{})})]})]},n.id)}))]})}),U=(t(89),t(90),function(){var n=Object(v.a)(T),e=n.loading,t=n.error,i=n.data,a=i?i.getTodoList:null,c=Object(x.useState)(a),d=Object(p.a)(c,2),o=d[0],r=d[1];return e?Object(q.jsx)("p",{children:"Loading..."}):t?(console.log(t),Object(q.jsx)("p",{children:"Error"})):(i&&!o&&r(a),Object(q.jsxs)("div",{className:"App",children:[Object(q.jsx)(G,{todoList:o,setTodoList:r}),Object(q.jsx)(P,{todoList:o,setTodoList:r})]}))}),V=t(35),Y=Object(u.a)({uri:"https://todo-app-server-expanded.herokuapp.com/graphql"}),K=new g.a({uri:"wss://todo-app-server-expanded.herokuapp.com/graphql",options:{reconnect:!0}}),M=Object(O.a)((function(n){var e=n.query,t=Object(V.e)(e);return"OperationDefinition"===t.kind&&"subscription"===t.operation}),K,Y),Q=Object(m.a)((function(n,e){var t=e.headers;return{headers:Object(j.a)(Object(j.a)({},t),{},{Authorization:"cGV0ZXJAYXBvbGxvZ3JhcGhxbC5jb20"})}})),R=new l.a({link:Q.concat(M),cache:new f.a});b.a.render(Object(q.jsx)(h.a,{client:R,children:Object(q.jsx)(U,{})}),document.getElementById("root"))},81:function(n,e,t){},88:function(n,e,t){},89:function(n,e,t){}},[[101,1,2]]]);
//# sourceMappingURL=main.0f20f920.chunk.js.map