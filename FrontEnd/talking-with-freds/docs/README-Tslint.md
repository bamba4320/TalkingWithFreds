# Tslint

- Use "`!`" After properties with type (not `any`) that aren't initialized.
  <br>for example, in `User.dto`, use:

  ```
  public firstName!: string;
  ```

- Use `Logger.` class instead of `console.log`
- Use of `debugger;` is not allowed by tslint
- each `method` and `property` should declared with `private`/`public`/`protected`.
- `public` method should be before `private` methods on the code
