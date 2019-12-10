import _ from 'lodash';
import React from 'react';
import Carousel, {consts} from 'react-elastic-carousel';
import {Button, Grid, Icon, Image} from 'semantic-ui-react';

interface IProps {
	carouselId: string; // THIS HAS TO BE UNIQUE. this is for the div in mobile that covers the carousel for scrolling
	itemsToShow: number;
	isAutoPlay: boolean; // this is only for auto play and carousels that doesnt have arrows buttons
	isPagination: boolean;
	autoPlaySpeed?: number; // must be larger then 300 ms
	focusOnSelect?: boolean;
	showArrows: boolean;
	breakPoints?: Array<{width: number; itemsToShow: number; itemsToScroll?: number}>;
	isInsidePagination?: boolean;
	slider?: boolean;
	onNextStart?: any;
	onPrevStart?: any;
	getActiveIndex?: any; // this is for handleing another state of active index for other purposes - examples in popularCategories and mainSendGiftForm
	enableMouseSwipe?: boolean;
	itemPadding?: number[];
	initialFirstItem?: number;
	animationForAutoPlay?: 'ease' | string; // animation
	transitionMsForAutoPlay?: number; // spped of animation
	enlargeOnHover?: boolean;
	infinite?: boolean;
}

interface IState {
	activeIndex: number;
	itemsToShow: number;
	scrollY: number;
	scrollX: number;
	isScrollingDivDown: boolean;
	itemHeight: number;
	infiniteChildren: any[];
	gotoIndex: number;
	shouldDeleteDiv: boolean;
	isManualLastItemNext: boolean;
}

// for more info about react-elastic-carousel - https://sag1v.github.io/react-elastic-carousel/#/
/**
 * this carousel had a problem with scrolling up and down in mobile, because the library ovrerides
 * the onTouchMove method for every element connected to it in the dom. so our solution was to
 * add a transperent div to cover the entire carousel while scrolling up and down and it listens
 * to the touchs of the user and if the user wants to click on an item in the carousel or swipe
 * left and right, at the first try it wont work, but after the first try the div will disappear,
 * and then the user will be able to click on an item and scroll left and right. if he then trys
 * to scroll up or down, again at first it wont work, but then the div will return and scrolling
 * up and down will be possible again. this happens becuase every item in the carousel is surrounded
 * by a div that also listens to the touchs of the user(again without onTouchMove becuase it doesnt work)
 * and restores the div if necessary.
 */
export default class CustomCarousel extends React.Component<IProps, IState> {
	private windowWidth: number;
	private carousel: any;
	private itemId: string;
	private initalNumberOfChildren: number;
	constructor(props: Readonly<IProps>) {
		super(props);
		this.windowWidth = 0;
		this.itemId = `${this.props.carouselId}_carousel_item_wrapper_`;
		this.initalNumberOfChildren = React.Children.toArray(this.props.children).length;
		this.state = {
			activeIndex: 0,
			itemsToShow: this.props.itemsToShow,
			scrollY: 0,
			scrollX: 0,
			isScrollingDivDown: false, // false-div is up, true-div is down
			itemHeight: 0,
			infiniteChildren: React.Children.toArray(this.props.children),
			gotoIndex: -1,
			shouldDeleteDiv: false,
			isManualLastItemNext: false,
		};
	}

	// this is for getting the window size only on client side
	public componentDidMount() {
		this.windowWidth = window.innerWidth;
		setTimeout(() => {
			this.setState({activeIndex: this.calculateActiveIndex()});
			if (this.getChildren().length > 0) {
				const item = document.getElementById(`${this.itemId}0`);
				if (item) {
					this.setState({itemHeight: item.clientHeight});
				}
			}
		}, 700);
	}

	// this is for getting the window size only on client side
	public componentDidUpdate() {
		this.windowWidth = window.innerWidth;
	}

	public render() {
		return this.getChildren().length > 0 ? (
			<div style={{width: '100%'}}>
				{this.windowWidth < 1024 && !this.state.isScrollingDivDown && (
					<div
						onTouchStart={(e) => {
							const pageProps = e.changedTouches[0];
							// saves the position of the first touch
							this.setState({scrollY: pageProps.clientY, scrollX: pageProps.clientX});
						}}
						onTouchEnd={() => {
							if (this.state.gotoIndex < this.getChildren().length && this.state.gotoIndex >= 0) {
								this.props.getActiveIndex && this.props.getActiveIndex(this.state.gotoIndex);
								this.setState({activeIndex: this.state.gotoIndex, isScrollingDivDown: this.state.shouldDeleteDiv});
								this.goto(this.state.gotoIndex);
							} else if (this.state.gotoIndex === -1 && this.state.shouldDeleteDiv) {
								if (this.props.infinite) {
									this.autoPlayGoToLast();
								}
								this.setState({isScrollingDivDown: true});
							} else if (this.state.gotoIndex === this.initalNumberOfChildren && this.state.shouldDeleteDiv) {
								if (this.props.infinite) {
									this.autoPlayGoToFirst(this.initalNumberOfChildren - 1);
								}
								this.setState({isScrollingDivDown: true});
							}
						}}
						// tslint:disable-next-line:jsx-no-lambda
						onTouchMove={(e) => {
							const pageProps = e.changedTouches[0];
							// if the user scrolled more left/right then up/down, then it removes the div
							if (Math.abs(pageProps.clientX - this.state.scrollX) > Math.abs(pageProps.clientY - this.state.scrollY)) {
								let delta = 1;
								if (pageProps.clientX < this.state.scrollX) {
									delta = -1;
								}
								// scrolls to the item that the carousel was suppose to scroll to if there wasnt a div
								this.setState({shouldDeleteDiv: true, gotoIndex: this.state.activeIndex + delta});
							} else {
								// else it updates the position of the user touch
								this.setState({scrollY: pageProps.clientY, scrollX: pageProps.clientX, gotoIndex: -1});
							}
						}}
						onClick={(_e) => {
							// if the user clicked then it also removes the div
							this.setState({isScrollingDivDown: true});
							// this is an array of one children that is the item that under the div that
							// cover each children of the carousel array
							const diff = window.innerWidth - _e.clientX;
							const itemWidth = window.innerWidth / this.getNumberOfItemsToShow();
							const clickIndex = this.state.activeIndex + (diff > itemWidth ? _.round(diff / itemWidth - 0.5) : 0);
							const clickElement = document.getElementById(
								`${this.itemId}${clickIndex > this.getChildren().length ? this.getChildren().length - 1 : clickIndex}`
							);
							// calls the action to activate all the onClick events of the element and his children
							this.activateOnClickForCarouselItem(clickElement!.children);
						}}
						// the div has the height of the carousel
						style={{width: '100%', height: this.state.itemHeight, position: 'absolute', zIndex: 10}}
					/>
				)}
				<Carousel
					isRTL
					ref={(ref: any) => (this.carousel = ref)}
					itemsToShow={this.calcItemsToShow()}
					pagination={this.props.isPagination}
					focusOnSelect={this.props.focusOnSelect}
					enableAutoPlay={this.props.isAutoPlay}
					autoPlaySpeed={this.props.autoPlaySpeed}
					showArrows={this.props.showArrows}
					renderArrow={this.customArrow}
					onNextStart={this.onNextStart}
					onNextEnd={this.onNextEnd}
					onPrevStart={this.onPrevStart}
					enableMouseSwipe={this.props.enableMouseSwipe}
					initialFirstItem={this.calculateActiveIndex()}
					itemPadding={this.props.itemPadding ? this.props.itemPadding : [0, 0, 0, 0]}
					transitionMs={this.props.transitionMsForAutoPlay ? this.props.transitionMsForAutoPlay : 500}
					easing={this.props.animationForAutoPlay ? this.props.animationForAutoPlay : 'ease'}
					onResize={(currentBreakPoint: {itemsToShow: number}) => {
						this.setState({itemsToShow: currentBreakPoint.itemsToShow});
					}}
					style={{
						width: this.props.slider ? '100%' : null,
					}}
					// tslint:disable-next-line: jsx-no-lambda
					renderPagination={({pages, activePage, onClick}: {pages: number[]; activePage: number; onClick: any}) => {
						return (
							<Grid.Row
								direction='row'
								style={{
									zIndex: this.props.isInsidePagination ? '2' : null,
									marginTop: this.props.isInsidePagination ? '-45px' : null,
								}}>
								{pages.length > this.initalNumberOfChildren
									? pages.slice(0, pages.length - 1).map((page: number) => {
											const isActivePage = page === 0;
											return (
												<Icon
													name='circle'
													color='purple'
													size='small'
													cursorpointer='1'
													key={page}
													onClick={() => {
														onClick(page);
														const newActiveIndex =
															page === pages.length - 1
																? this.getChildren().length - this.state.itemsToShow
																: page * this.state.itemsToShow;
														this.setState({activeIndex: newActiveIndex > 0 ? newActiveIndex : 0});
													}}
													active={isActivePage.toString()}
													disabledicon={isActivePage ? null : '1'}
												/>
											);
									  })
									: pages.map((page: number) => {
											const isActivePage = activePage === page;
											return (
												<Icon
													name='circle'
													color='purple'
													size='small'
													cursorpointer='1'
													key={page}
													onClick={() => {
														onClick(page);
														const newActiveIndex =
															page === pages.length - 1
																? this.getChildren().length - this.state.itemsToShow
																: page * this.state.itemsToShow;
														this.setState({activeIndex: newActiveIndex > 0 ? newActiveIndex : 0});
													}}
													active={isActivePage.toString()}
													disabledicon={isActivePage ? null : '1'}
												/>
											);
									  })}
							</Grid.Row>
						);
					}}>
					{this.getChildren() &&
						this.getChildren().map((children, index) => {
							return (
								<div
									style={{width: '100%'}}
									id={`${this.itemId}${index}`}
									key={`${this.itemId}${index}`}
									className={this.props.enlargeOnHover ? 'popular-enlarge-desktop' : ''}
									onTouchStart={(e) => {
										const pageProps = e.changedTouches[0];
										// saves the position of the first touch
										this.setState({
											scrollY: pageProps.clientY,
											scrollX: pageProps.clientX,
										});
									}}
									onTouchEnd={(e) => {
										const pageProps = e.changedTouches[0];
										// if the user scrolled more up/down then left/right then it restores the div
										if (
											Math.abs(pageProps.clientX - this.state.scrollX) <
											Math.abs(pageProps.clientY - this.state.scrollY)
										) {
											// restores the div
											this.setState({isScrollingDivDown: false, shouldDeleteDiv: false});
										}
									}}>
									{children}
								</div>
							);
						})}
				</Carousel>
			</div>
		) : (
			<></>
		);
	}

	private getChildren = (): any[] => {
		return this.props.infinite ? this.state.infiniteChildren : React.Children.toArray(this.props.children);
	};

	/**
	 * this function is for the div that covers the carousel in mobile-
	 * on the event of onClick of an item of the carousel while the div is up,
	 * we use this function on the carousel item of the current active index
	 * to go for all the element children and activate thier on click and
	 * on focus events. it dose this recursively on all the children of the element.
	 */
	private activateOnClickForCarouselItem = (elementArray: HTMLCollection) => {
		for (let i = 0; i < elementArray.length; i++) {
			const element = elementArray[i] as HTMLElement;
			element.click();
			element.focus();
			this.activateOnClickForCarouselItem(element.children);
		}
	};

	private customArrow = ({type, onClick}: {type: any; onClick: any}) => {
		return (
			<Button
				onClick={onClick}
				sliderbutton='1'
				type='button'
				disabled={
					type === consts.PREV
						? this.state.activeIndex === 0
						: this.state.activeIndex >= this.getChildren().length - this.state.itemsToShow
				}>
				<Image
					src={`/static/icons/${
						type === consts.PREV
							? this.state.activeIndex === 0
								? 'arrow-right-disabled'
								: 'arrow-right'
							: this.state.activeIndex >= this.getChildren().length - this.state.itemsToShow
							? 'arrow-left-disabled'
							: 'arrow-left'
					}.svg`}
				/>
			</Button>
		);
	};

	private goto = (index: number) => {
		if (this.carousel) {
			this.setState({activeIndex: index});
			this.carousel.goTo(index);
		}
	};

	/**
	 * this function only happens in autoPlay carousels and it makes it
	 * loops back to the first item after it got to its last, in a
	 * normal animation
	 */
	private onNextEnd = (currentItem: any) => {
		this.setState({activeIndex: currentItem.index});
		// only happens if its the real last item
		if (this.props.infinite && currentItem.index === this.initalNumberOfChildren - 1) {
			setTimeout(
				() => {
					if (!this.state.isManualLastItemNext) {
						this.autoPlayGoToFirst(currentItem.index);
					} else {
						this.setState({isManualLastItemNext: false});
					}
				},
				this.props.autoPlaySpeed ? this.props.autoPlaySpeed : 2000
			);
		}
	};

	private onNextStart = (currentItem: any) => {
		if (this.state.activeIndex < this.getChildren().length - this.state.itemsToShow) {
			this.props.getActiveIndex && this.props.getActiveIndex(this.state.activeIndex + 1);
			this.setState({activeIndex: this.state.activeIndex + 1});
			this.props.onNextStart && this.props.onNextStart();
		} else if (this.props.infinite && currentItem.index === this.initalNumberOfChildren - 1) {
			this.setState({isManualLastItemNext: true});
			this.autoPlayGoToFirst(this.initalNumberOfChildren - 1);
		}
	};

	private autoPlayGoToFirst = (currentItemIndex: number) => {
		if (this.state.activeIndex === currentItemIndex) {
			const children = this.getChildren();
			const temp = [...children];
			// pushes to the temp children the first children
			temp.push(children[0]);
			this.controlAnimation(true);
			// sets the children state of the carousel to the temp array
			this.setState({infiniteChildren: temp}, () => {
				// goes to the last item which is the item we added
				// (which is the first item in the children of the carousel)
				this.goto(currentItemIndex + 1);
				setTimeout(
					() => {
						// disables the animation
						this.controlAnimation(false);
						// goes to the real first item
						if (this.state.activeIndex === currentItemIndex + 1) {
							this.goto(0);
						}
						// deletes the added last item which is the first item
						this.setState({infiniteChildren: [...children]});
						setTimeout(() => {
							// restores the animation for the rest of the carousel
							this.controlAnimation(true);
							if (this.props.isAutoPlay) {
								// this happens after going to the additional last item ("this.goto(currentItem.index + 1);") which is the first children
								// we do this action becuase after going to the real first item the carousel stuck, so we do this transition to the
								// second item so the transition of the carousel will continue normally
								setTimeout(
									() => {
										if (this.state.activeIndex === 0) {
											this.goto(1);
										}
									},
									this.props.autoPlaySpeed ? this.props.autoPlaySpeed : 2000
								);
							}
						}, 300);
					},
					this.props.transitionMsForAutoPlay ? this.props.transitionMsForAutoPlay : 500
				);
			});
		}
	};

	private controlAnimation = (tornOn: boolean) => {
		const recElement = document.getElementsByClassName('rec-slider')[
			document.getElementsByClassName('rec-slider').length - 1
		] as HTMLElement;
		if (recElement) {
			if (tornOn) {
				recElement.style.transition = `all ${
					this.props.transitionMsForAutoPlay ? this.props.transitionMsForAutoPlay : 500
				}ms ${this.props.animationForAutoPlay ? this.props.animationForAutoPlay : 'ease'}`;
			} else {
				recElement.style.transition = 'none';
			}
		}
	};

	private onPrevStart = (currentItem: any) => {
		if (this.state.activeIndex > 0) {
			this.props.getActiveIndex && this.props.getActiveIndex(this.state.activeIndex - 1);
			this.setState({activeIndex: this.state.activeIndex - 1});
			this.props.onPrevStart && this.props.onPrevStart();
		} else if (this.props.infinite && currentItem.index === 0) {
			this.autoPlayGoToLast();
		}
	};

	// TODO: change comments
	private autoPlayGoToLast = () => {
		if (this.state.activeIndex === 0) {
			const children = this.getChildren();
			const temp = [...children];
			// pushes to the temp children the first children
			temp.push(children[0]);
			this.controlAnimation(false);
			// sets the children state of the carousel to the temp array
			this.setState({infiniteChildren: temp}, () => {
				// goes to the last item which is the item we added
				// (which is the first item in the children of the carousel)
				this.goto(this.initalNumberOfChildren);
				setTimeout(() => {
					// disables the animation
					this.controlAnimation(true);
					// goes to the real first item
					if (this.state.activeIndex === this.initalNumberOfChildren) {
						this.goto(this.initalNumberOfChildren - 1);
					}
					// deletes the added last item which is the first item
					this.setState({infiniteChildren: [...children]});
					if (this.props.isAutoPlay) {
						setTimeout(
							() => {
								// this happens after going to the additional last item ("this.goto(currentItem.index + 1);") which is the first children
								// we do this action becuase after going to the real first item the carousel stuck, so we do this transition to the
								// second item so the transition of the carousel will continue normally
								setTimeout(
									() => {
										if (this.state.activeIndex === this.initalNumberOfChildren - 1) {
											this.autoPlayGoToFirst(this.initalNumberOfChildren - 1);
										}
									},
									this.props.autoPlaySpeed ? this.props.autoPlaySpeed : 2000
								);
							},
							this.props.transitionMsForAutoPlay ? this.props.transitionMsForAutoPlay : 500
						);
					}
				}, 300);
			});
		}
	};

	private getNumberOfItemsToShow = () => {
		let itemsToShow = this.props.itemsToShow;
		// gets the breakpoint
		if (this.props.breakPoints && this.props.breakPoints.length > 0) {
			const activeBreakPoint = this.props.breakPoints.filter((bp) => {
				if (bp.width < this.windowWidth) {
					return bp;
				}
			});
			// gets the items to show by the breakpoint
			itemsToShow =
				activeBreakPoint.length > 0
					? activeBreakPoint[activeBreakPoint.length - 1].itemsToShow
					: this.props.itemsToShow;
		}
		return itemsToShow;
	};

	// This method calculates the number of items to show by the breakpoints that were given to this component by props,
	// and rounds down the number of items to show if its the last item to show if the number of items to show is a
	// float number(like 1.3,2.5,etc). If breakpoints werent given to this component this will still work
	private calcItemsToShow = () => {
		const itemsToShow = this.getNumberOfItemsToShow();
		return this.state.activeIndex > this.getChildren().length - this.state.itemsToShow - 1
			? _.round(itemsToShow - 0.5)
			: itemsToShow;
	};

	private calculateActiveIndex = () => {
		let activeIndex = this.state && this.state.activeIndex ? this.state.activeIndex : 0;
		if (this.props.initialFirstItem) {
			const maxItemIndex: number = this.getChildren().length - this.calcItemsToShow();
			activeIndex = this.props.initialFirstItem > maxItemIndex ? maxItemIndex : this.props.initialFirstItem;
		}
		return activeIndex;
	};
}
