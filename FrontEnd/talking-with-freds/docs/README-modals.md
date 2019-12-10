# Modals

- In this project we use a `mobx store` in order to be able to have the functionalities of rendering dynamic modal components.

- To build such a modal, you will simply have to add it to the `modal store`.
  We are doing so by writing this code wherever we would like to open our modal-

```
this.modalStore.openModal(
    <MainLoginComponent
        openModal={this.modalStore.openModal}
        closeModal={this.modalStore.popModal}
    />,
    {
        title: 'login.Login',
        fullScreen: true,
        closeFromOutsideModal: true,
    }
);
```

- `Notice:` that the `openModal` function is accessed through the modal store property of the class that you injected the store in.
  This function accepts two arguments:

1. component object with a type of `any`. This argument will be the component itself which you want to render inside the modal wrapper.

2. options object which holds inside a lot of optional options that you can add

---

# Handling Routes Changes And Opening/Closing of The Modal

- In this project, in order to deal with the back/next event on mobile when a modal is open,
  we listen to the back event and close the model when it happens (both desktop and mobile).
  In order to ONLY close the modal and not to close the modal AND go back a page,
  we add "#modal" to the URL, so it would go back to the page
  we have been (only the url will be without the "#modal").
  If the device is mobile and it is the first modal - we save it in historyModal.
  We do that, because if we were in a modal and then we went back (->),
  we will be able to go next (<-) and see the modal we closed.

- After we close a modal, there are certain problems that came up, becuase of
  us pushing the url only without that #modal in the closeModal action.

1. if the url had a query param that was only meant to happen once, for example, the forgot password modal, which can be opend by trying to update the password with an expired token, so after going to the updatePassword page there will be a redirection to the home page with the query that suppose to open the forgot password modal again, but because after closing the modal it pushes the url, then the page will open the modal again, becuase the query is still in the url. To solve this problem we mad ea black list of query params that we do not want to push again after closing the modal.

```
@action
	public closeModal = () => {
		const ismobile: boolean = window.innerWidth <= Width.mobile;
		if (ismobile) {
			let router = Router;
			// go for each item in "modalQueryBlackList" array and removes     specific query keys from the blackList
			// the  "modalQueryBlackList"  is blackList all the query keys that we don't want to push to the URL after "closeModal"
			modalQueryBlackList.forEach((query: string) => {
				router = removeQueryParam(router, query);
			});
			pushUrl(router);
		}
		this._modalIsOpen = false;
		this.cleanStack();
	};
```

2. there are some modals that in their content, they can change the url (for example, Gifts Filters Modal,SearchContainer-in mobile). this caused a problem in mobile, becuase of the timing of the changes of the url. for example the search results from searching in the search modal were links to the benefitPage that had an onClick event that closed the modal. so what happend was that only after entering the page of the link the user clicked on, the close modal action occurred and it pushed the old url back. to solve this we made the reults with only onClick event that pushed the url with #modal in it and only after it finished pushing, it closes the modal so the push in the close modal action would only delete the #modal from the url.
