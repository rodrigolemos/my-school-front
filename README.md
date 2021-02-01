## Introdução

My School é um simples projeto de gerenciamento de usuários feito com o intuito de aplicar ferramentas que tenho estudado recentemente. Nele é possível ver na prática a utilização da stack ReactJS, NextJS e styled-components; material-ui e react-hook-form além de várias outras APIs bastante úteis no desenvolvimento deste tipo de software. Por ser uma aplicação de estudos, não há intenção em disponibilizá-la como produto ou publicá-la para uso em produção. Caso considere alguma parte do código interessante ou acredite que algo possa ser melhorado, fique à vontade para comentar. Todo feedback é bem-vindo.

## Definições

O projeto foi dividido em 4 partes separadas por níveis de usuário da seguinte maneira:

- Visitante - Esse é o nível mais básico de acesso. Usuários com esse perfil ainda não criaram uma conta ou ainda não estão logados na plataforma. Dessa maneira, é possível acessar a página inicial, a lista de cursos, os detalhes de cada curso, a página de criação de perfil e o login;

- Aluno - Esse é o nível mais básico de acesso logado. Usuários com esse perfil, além de poderem fazer tudo o que um visitante faz, podem se cadastrar nos cursos que desejarem, acompanhar seu dashboard de acessos, atualizar seu perfil e posteriormente poderão assistir às aulas cadastradas na plataforma;

- Professor - Esse é um nível especial de acesso logado. Professores só podem ser cadastrados na plataforma por administradores. Além de todas as funcionalidades presentes no nível de acesso dos alunos, professores posteriormente poderão cadastrar aulas na plataforma e apontar as notas dos alunos;

- Administrador - Esse é o nível de maior privilégio logado. Administradores podem incluir, alterar, atualizar e excluir cursos; incluir ou atualizar acessos de professores e outros administradores; aprovar ou excluir matrículas em determinados cursos. Entretanto, administradores não podem estar matriculados em curso algum.

## Tecnologias

Como mencionado, este é um projeto de estudos e tem como premissa o aprendizado e a apresentação de tecnologias, frameworks e ferramentas de desenvolvimento. Segue a lista das principais libs utilizadas:

- React JS - Uma biblioteca JavaScript para criar interfaces de usuário;
- Next JS – Um framework React para produção;
- Styled Components – Uma biblioteca popular para uso de CSS-in-JS;
- Material UI - Biblioteca de componentes React baseada no design Material;
- Chart JS – Biblioteca open source de gráficos;
- react-hook-form – Biblioteca popular para validação de formulários completos;
- yup – Biblioteca para validação de campos e schemas;
- date-fns – Biblioteca para manipulação de datas;
- jsonwebtoken – Biblioteca para transmissão segura de JWTs;
- axios – Cliente HTTP baseado em promises;
- react-cookie – Para manipulação dos cookies;

## Autor

Rodrigo Lemos