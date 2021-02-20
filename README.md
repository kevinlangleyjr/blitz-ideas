<p align="center">
  <a href="https://shareideas.dev/">
    <img src="https://res.cloudinary.com/kevinlangleyjr-dev/image/upload/v1613830978/ideas_h9ngyw.png">
  </a>
</p>

# Share Ideas!

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/ideas
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/ideas_test
```

## Tests

Runs your tests using Jest.

```
blitz test
or
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  help      display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## What's included?

Here is the structure of the app.
```
ideas
├── README.md
├── app
│   ├── api
│   ├── auth
│   │   ├── components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── mutations
│   │   │   ├── changePassword.ts
│   │   │   ├── forgotPassword.test.ts
│   │   │   ├── forgotPassword.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── resetPassword.test.ts
│   │   │   ├── resetPassword.ts
│   │   │   └── signup.ts
│   │   ├── pages
│   │   │   ├── forgot-password.tsx
│   │   │   ├── login.tsx
│   │   │   ├── reset-password.tsx
│   │   │   └── signup.tsx
│   │   └── validations.ts
│   ├── comments
│   │   ├── components
│   │   │   ├── CommentForm.tsx
│   │   │   └── IdeaComments.tsx
│   │   ├── mutations
│   │   │   ├── createComment.ts
│   │   │   ├── deleteComment.ts
│   │   │   └── updateComment.ts
│   │   ├── queries
│   │   │   ├── getComment.ts
│   │   │   └── getComments.ts
│   │   └── validations.ts
│   ├── core
│   │   ├── components
│   │   │   ├── Form.tsx
│   │   │   ├── LabeledTextField.tsx
│   │   │   └── LabeledTextareaField.tsx
│   │   ├── hooks
│   │   │   └── useCurrentUser.ts
│   │   └── layouts
│   │       └── Layout.tsx
│   ├── ideas
│   │   ├── components
│   │   │   └── IdeaForm.tsx
│   │   ├── mutations
│   │   │   ├── createIdea.test.ts
│   │   │   ├── createIdea.ts
│   │   │   ├── deleteIdea.ts
│   │   │   └── updateIdea.ts
│   │   ├── queries
│   │   │   ├── getIdea.ts
│   │   │   └── getIdeas.ts
│   │   └── validations.ts
│   ├── pages
│   │   ├── 404.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── ideas
│   │   │   ├── [ideaId]
│   │   │   │   └── edit.tsx
│   │   │   ├── [ideaId].tsx
│   │   │   ├── index.tsx
│   │   │   └── new.tsx
│   │   ├── index.test.tsx
│   │   └── index.tsx
│   └── users
│       └── queries
│           └── getCurrentUser.ts
├── babel.config.js
├── blitz.config.js
├── db
│   ├── index.ts
│   ├── migrations
│   │   ├── 20210219201255_
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seeds.ts
├── integrations
├── jest.config.js
├── mailers
│   └── forgotPasswordMailer.ts
├── package.json
├── public
│   ├── favicon.ico
│   └── logo.png
├── test
│   ├── setup.ts
│   └── utils.tsx
├── tsconfig.json
├── types.d.ts
├── types.ts
└── yarn.lock
```

These files are:

- The `app/` folder is a container for most of your project. This is where you’ll put any pages or API routes.

- `db/` is where your database configuration goes. If you’re writing models or checking migrations, this is where to go.

- `public/` is a folder where you will put any static assets. If you have images, files, or videos which you want to use in your app, this is where to put them.

- `integrations/` is a folder to put all third-party integrations like with Stripe, Sentry, etc.

- `test/` is a folder where you can put test utilities and integration tests.

- `package.json` contains information about your dependencies and devDependencies. If you’re using a tool like `npm` or `yarn`, you won’t have to worry about this much.

- `tsconfig.json` is our recommended setup for TypeScript.

- `.babelrc.js`, `.env`, etc. ("dotfiles") are configuration files for various bits of JavaScript tooling.

- `blitz.config.js` is for advanced custom configuration of Blitz. It extends [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction).

- `jest.config.js` contains config for Jest tests. You can [customize it if needed](https://jestjs.io/docs/en/configuration).

You can read more about it in the [File Structure](https://blitzjs.com/docs/file-structure) section of the documentation.

## Learn more

Read the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started) to learn more.

The Blitz community is warm, safe, diverse, inclusive, and fun! Feel free to reach out to us in any of our communication channels.

- [Website](https://blitzjs.com/)
- [Discord](https://discord.blitzjs.com/)
- [Report an issue](https://github.com/blitz-js/blitz/issues/new/choose)
- [Forum discussions](https://github.com/blitz-js/blitz/discussions)
- [How to Contribute](https://blitzjs.com/docs/contributing)
- [Sponsor or donate](https://github.com/blitz-js/blitz#sponsors-and-donations)
