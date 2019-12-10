## Semantic-UI-Responsive

In order to do responsive rendering for mobile and desktop with Semantic we use grid and not responsive.
When we use responsive it takes Semantic's defaults BreakPoints and there isn't way to change them because Responsive is an element with const Breakpoints of Semantic UI.

In addition Grid is also helpful to choose how much width and height we want to give each component in mobile or desktop.
We have 16 columns and we can choose how much columns to give:

```
<Grid.Column computer={14} tablet={16}
```

Grid also has a special feature that called:`only` with this we can set the component to be visible in **only** mobile or something else

```
<Grid.Column computer={14} tablet={16} only='computer tablet'>
	{this.renderDesktop()}
</Grid.Column>
```
