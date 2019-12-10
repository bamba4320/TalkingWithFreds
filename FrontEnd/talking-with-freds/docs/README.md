# The project is divided to 3 layers:

1. Infrastructure - fetchers, configuration, storage. all we need in order to use any API the web offer us 🌈
2. BL - `B`usiness `L`ogic Layer - in Our project the main component that controll the logic, is `mobx stores`.
3. UI - `containers` and `components`. we will include here all the `.tsx` and `.sccs` (or `.css`/`.less`) files

# Namespace convention

- **Fetchers** should end with `.fetcher`
- **configuration files** stores should end with `.config` - even `env.config` or `site.config`
- **mobx stores** should end with `.store`
- **UI containers** should end with `.container`
- **UI components** should end with `.component`

# Directory Architecture

```
src
   |- index.tsx - HERE THE APP BEGIN!
   |- index.scss - HERE THE APP "Styling" BEGIN!
   |- BL
      |- stores // Should be ".store" files
   |- common
      |- errorHandling
         |- AlertUtils.ts
         |- ErrorUtils.ts
      |- generalConsts // In the near future we will move this to other place
      |- models
         |- converters // Here are all the helper class for converting between DTOs and Models
         |- DTOs // All the DTO classes
         |- index.ts // export all the converters, DTOs and Models in THIS directory
      |- routes
         |- historyUtils.ts // helper class for make actions with "history" object
         |- routesPaths.consts.ts // all the Routes in the app
      |- utils // all the General utils class for all the Layers in the App
         |- logger
   |- Infrastructure
      |- apiMessages
      |- config
         |- env.config // Environment variables for the App
         |- site.config // Controller for the configuration we get from the storage server
      |- fetchers
         |- base
            |- ApiResponse.interface // Declare on interface of the response from the API
            |- base.fetcher // Base class for all the fetchers in the app
         |- index.ts // export all the fetchers in this directory
      |- storage
   |- semantic-ui
   |- UI
      |- components // Should be ".components" files
      |- containers // Should be ".containers" files
```

# Common

`common` is not a layer, it is a connector between those 3 layers i mentioned before
<br>for instance, `errorHandling` is here because, we get an `ApiError` at the infrastructure when we `fetch` a request to the API, afterwards, the `store` (At the BL) controll weather to make an action, OR show alert popup (With `ErrorUtils`). The `UI` layer can use the `AlertUtils` in order to show a message to the user.

### _models_ in "common" Layer

the models helps us to make the logic actions at the app.
<br>for instance, in a puchase page, where the user can add the _procuts_ the website offer to his _cart_, and than pay on them with a _credit card_... we would use a `Product` model, and add it to our `Cart` model. afterwards, the user will pay on those products, and we'll send an API request with the `CreditCard` model on the body request.
<br>There are `2` types of models that we'll use in this project.

1. `DTO`s - `D`ata `T`ransfer `O`bject. those object are intended to pass through the network. for instance, after a `getCurrentUser` request, we will get a `UserDTO` object at the response body.
   <br> \* pay attention that the files of this object should be called: `user.dto.ts`
2. `model` - this is the model that we make logic on it. it is also be an `@observable` of `mobx`.
   <br>for instance, after a `getCurrentUser`, we would get an `UserDTO` object and we will convert it to `UserModel` like this:

```
const userDTO: UserDTO = await UsersFetcher.authenticate(identity, password);

// This is the converting                     👇🏻
const userModel: UserModel = UserConverter.DtoTOModel(userDTO);
```

The convert is done with an `UserConverter` class.
<br>pay attention to the naming convention: `user.converter.ts`
<br>The converter class suppose to convert the DTO to a Model **_and vise versa_**

# Fetchers

The `fetchers` should point to its own API endpoint.<br>
for instance, `media.fetcher` would point to `/api/media`:

`media.fetcher.ts` file:

```
export default new MediaFetcher(`${envConfiguration.apiHost}/media`);
```

Each class that `extends BaseFetcher` would "get" a `request interceptor` and `response interceptor`.
the request interceptor add the token from the `localStorage` (or `sessionStorage` if `rememberMe === false`).
the response interceptor extract the `data` object from the `ApiResponse` so the response object after making the request is the data itself<br>
for instance, **in** `users.fetcher.ts`, we use:

```
const body = {
   IdentityNumber: identity,
   Password: password,
   LoginType: LoginCredentials.IdentityAndPassword,
   AuthenticateOrJoin: SignOptions.Authenticate,
};

return this.post('/authenticate', body);
```

and in `auth.store.ts` we would use:

```
//  This 👇🏻 object is already the userDTO itself
const userDTO: UserDTO = await UsersFetcher.authenticate(identity, password);
```

That help us to get the data from the respose instead of extract the data ourself each request like this:

```
// WE DO NOT NEED TO DO THIS!!!
// WE DO NOT NEED TO DO THIS!!!
// WE DO NOT NEED TO DO THIS!!!
const response: any = await UsersFetcher.authenticate(identity, password);
if(response && response.data && response.data.status) {
   const userDTO: UserDTO = response.data
}
```

# Error Handling

This section is about controlling the Errors that comes from the server-side after an API request is made. Error could be an Technical error - such as, No internet connection, OR, Logic error - such as, User don't have the permission to make an action.

- The `response interceptor` already helps us to extract the error from response in such a way that at the `catch` block, we'll get an `ErrorHTML`, `ErrorDescription`, `GeneralError` or a usual javascript, `Error`.
- The `AlertUtils` class helps us to show the corrent popup error to the user (with an `ErrorHTML`, `ErrorDescription` or `GeneralError` with generalErrorCode and generalErrorMessage)
  <br> for instance, in `auth.store.ts` we would use it like this:

```
@action
public async handleLogin(identity: string, password: string) {
   try {
      this.loading = true; // 👈🏼 This is for showing the loader icon to the user

      const userDTO: UserDTO = await UsersFetcher.authenticate(identity, password);
      // 👇🏻
      const userModel: UserModel = UserConverter.DtoTOModel(userDTO);
      this.currentUserStore.userAuthenticated(userModel);
      return userModel;
   } catch (err) {
      AlertUtils.checkApiErrorAndShowPopUp(err);
   } finally {
      this.loading = false;
   }
}
```

# `.env` files

In this project, we have `.env` files. this is the conventional way that "Create React App" use the env variables
<br>Pay Attention! Those files SHOULD NOT BE CHANGED. You can create a `.env.development.local` file and ovveride any env variables you want without affecting any developer in the team (You won't commit this file).
<br>
"Create React App will only have access to environment variables named starting with `REACT_APP_`,<br>so,`REACT_APP_SKITTLE_FLAVOR`works but`SKITTLE_FLAVOR` will not" - [link: environment in react](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env)

# TODOs

- NO NEED IN NEXT/JS - [Error bounderies](https://reactjs.org/docs/error-boundaries.html)
- Use [React-Helmet](https://github.com/nfl/react-helmet) in order to define the website title
- Use [daggy](https://github.com/fantasyland/daggy) `(???)`
- [BrowsersList package](https://github.com/browserslist/browserslist)
- [Polyfills](https://codeburst.io/hello-create-react-app-cra-typescript-8e04f7012939)
