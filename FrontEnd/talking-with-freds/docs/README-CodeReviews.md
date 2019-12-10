## Itay.2

1. remove material-ui
1. Use `loading` in UI and not in BL, as in

```
export default class ProfileStore {
	@observable
	public loading = false;
```

3. use `DTO` in fethcer
1. Check how to set image background

```
@pageBackground: white;
```

5. Check out if the fonts we have are good

```
'Helvetica Neue', Helvetica,
```

6. Read about "SPA" - Single Page Application
   and preapre for lecture!
1. Use `NavLink` from `react-router-dom` instead of `<a>`
1. change the link in `commonQuestions` - 👆🏻 - Itay will change it in next codereview
1. use the variable "primaryColor" in here:

```
//var for css files
:root{
  --primary-color: #992a84;
}
```

10. `ts` Classes should be named **U**pperCase
11. write comments on the `variables` of semantic-ui
12. move the `link-header` from Profile.scss to the less files
    <br>if you can't move this, wrap this class-selector in `profile-container` class (also add to `component.tsx`)

```
.link-header {
	padding-top: 7px;
	font-size: 13px;
	font-weight: bold;
	text-decoration: underline;
	color: #992a84;
}
```

13. also, remove

```
.headers-div {
	padding: 10px 10px 0 0;
	.header {
		color: var(--primary-color);
	}
	.text-link {
		padding-top: 7px;
		font-size: 13px;
		font-weight: bold;
		color: black;
		text-decoration: underline;
	}
}
```

14. the code below is in theme.config

```
@fontPath : '../../../themes/@{theme}/assets/fonts';
```

so, is this working?

```
src: url(OpenSansHebrew-Regular.ttf);
```

15. this code is really needed? i removed it from the project and the colors of the site are still purple

```

//var for css files
:root{
  --primary-color: #992a84;
}
```

16. is this code is need?
    <br>this code should be in `input.overrides`??

```
@inputPlaceholderColor: @primaryColor;
```

17. Change the name of `CustomTextArea.custom.tsx` to `CustomTextArea.component.tsx`
18. Also, change the name of the files & folders to UpperCase

# 21-22.6.19

1. Check the `exports`. for instance in `ContactUs.container` we exort the class in 2 places:
   <br>here:

   ```
   export class ContactUs extends React.Component<Props> {
   ```

   <br>and here:

   ```
   export default ContactUs;
   ```

2. do not use `style` in components. use the tools we have in semantic
   <br>Reminder for myself; search for:
   ```
   style={{
   ```

# 23.6.19

## Itay

1. What is this code means?

```
const error = ErrorUtils.extractError(res);

if (error) {
    throw error;
} else {
    return profileDTO;
}
```

2. split the core of the containers and components, and only than use responsive
