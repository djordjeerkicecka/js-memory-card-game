class GameElements {
	#data;
	#elementsCount;
	#gameWindow;

	constructor(data, elementsCount, gameWindow) {
		this.#data = data;
		this.#elementsCount = elementsCount;
		this.#gameWindow = gameWindow;

		this.#Render();
	}

	// Render elements on screen
	#Render() {
		let data = this.#GetArrayFromSource();
		let nodes = this.#GenerateMarkupFromArray(data);

		nodes.forEach(item => this.#gameWindow.appendChild(item));
	}

	#GenerateMarkupFromArray(data) {
		let nodes = [];

		data.forEach(item => nodes.push(this.#GenerateNodeFromData(item)));
        
		return nodes;
	}

	#GenerateNodeFromData(data) {
		let node = document.createElement('div');
		node.classList.add('card');
		node.setAttribute('data-id', data.id);

		let child = document.createElement('img');
		child.classList.add('card-img');
		child.setAttribute('src', data.src);
		child.setAttribute('alt', `cardImgId${data.id}`);

		node.appendChild(child);

		return node;
	}

	// Map source object item values to an array
	#GetArrayFromSource() {
		let sourceArray = [];

		Object.values(this.#data).forEach(item => sourceArray.push(item));

		let selection = [];

		// Select items from source array
		while (selection.length < this.#elementsCount) {
			let index = this.#GetNumber(sourceArray.length);

			selection.push(...sourceArray.splice(index, 1));
		}

		selection = [...selection, ...selection]; // Duplicate Array

		let items = [];

		while (items.length < this.#elementsCount * 2) {
			let index = this.#GetNumber(selection.length);

			items.push(...selection.splice(index, 1));
		}

		return items;
	}

	#GetNumber(multiplier) {
		return Math.floor(Math.random() * multiplier);
	}
}

class GameClock {
	#time;
	#timerRef;
	#timerElement;

	constructor(elementRef) {
		this.#time = 0;
		this.#timerRef = this.#Start();
		this.#timerElement = elementRef;
	}

	GetTime() {
		return this.#time;
	}

	#Start() {
		return setInterval(() => {
			this.#time++;
			this.UpdateDisplay(this.#time);
		}, 1000);
	}

	UpdateDisplay(value) {
		this.#timerElement.innerHTML = value;
	}

	Stop(ref) {
		clearInterval(ref);
	}
}

class GameState {
	#pairs;
    #selection;
	#score;
    #scoreRef;
    #gameObject;
    #gameClock;
    #gameEndRefs;

	constructor(gameData, elementsCount, gameWindow, scoreDisplay, timeDisplay, gameEndElements) {
		this.#selection = [];
		this.#pairs = elementsCount;
		this.#score = 0;
        this.#scoreRef = scoreDisplay;
        this.#gameEndRefs = gameEndElements;

		this.#gameObject = new GameElements(gameData, elementsCount, gameWindow);
		this.#gameClock = new GameClock(timeDisplay);
	}

	ProcessClick(element) {
		if (element.classList.contains('clicked')) return; // Ignore clicks on open cards
        if (this.#selection.length == 2) return; // Ignore click if 2 cards are open

		element.classList.add('clicked');
		this.#selection.push(element);

		if (this.#selection.length === 2) {
			if (this.#CheckForMatch(...this.#selection)) {
				this.#score++;
				this.#UpdateScore(this.#score);
				this.#pairs--;
				this.#selection = [];

				if (this.#pairs === 0) {
					setTimeout(() => {
						this.#EndGame();
					}, 300);
				}
			} else {
                setTimeout(() => {
                    this.#selection.forEach(item => item.classList.remove('clicked'));
                    this.#selection = [];
                }, 400);
			}
		}
	}

    #EndGame() {
        console.log(this.#gameEndRefs);
        this.#gameClock.Stop();
        let currentTime = this.#gameClock.GetTime();
        let currentScore = this.#score;

        this.#gameEndRefs[0].style.display = 'flex';
        this.#gameEndRefs[1].innerHTML = currentScore;
        this.#gameEndRefs[2].innerHTML = currentTime;
    }

	#UpdateScore(score) {
		this.#scoreRef.innerHTML = score;
	}

	#CheckForMatch(first, second) {
		if (first.dataset.id == second.dataset.id) {
			return true;
		} else {
			return false;
		}
	}
}
