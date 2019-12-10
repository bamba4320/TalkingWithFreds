# Please view this `README` before each codereview

1. Check on multiple browsers
2. Check on mobile, tablet, and dekstop
3. run lint-ts
4. methods that handle events should start with `handle`*XXX*
5. Create `.scss` files in the correct directory (`containers` or `components`)
6. use "organize imports" in order to sort the import and avoid ts-lint errors
```
{
  "key": "ctrl+alt+o",
  "command": "editor.action.organizeImports",
  "when": "editorTextFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/"
}
```
7. `ts` Classes should be named **U**pperCase
8. each content you add to `override` or `variables`, write it in [README-Semantic-overrides&variables.md](./README-Semantic-overrides&variables.md)
9. Use default props in components
10. in he.json - Use namespaces by page
<br>`he.json` should look like this:
    ```
    "profile.title": "מסך עדכון פרטים"
    "profile.subTitle": "בלה בלה בלה"
    "profile.emailInput": "אימייל"
    "contactUs.pageTitle": "כותרת של העמוד"
    ```
11. Components should import thereselves scss