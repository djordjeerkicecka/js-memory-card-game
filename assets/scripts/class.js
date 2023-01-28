class GameElements {
	#data;
	#elementsCount;
	#output;

	constructor(data, elementsCount, outputRef) {
		this.#data = data;
		this.#elementsCount = elementsCount;
		this.#output = outputRef;

		this.#RenderToOutput();
	}

	// Render elements on screen
	#RenderToOutput() {
		let data = this.#MapSourceToArray();
		let nodes = this.#GenerateMarkup(data);

		nodes.forEach(item => this.#output.appendChild(item));
	}

	#GenerateMarkup(data) {
		let nodes = [];

		data.forEach(item => {
			let node = document.createElement('div');
			let child = document.createElement('img');
			
			node.classList.add('card');
			node.setAttribute('data-id', item.id);

			child.classList.add('card-img');
			child.setAttribute('src', item.src);
			child.setAttribute('alt', `Img ID#${item.id}`);
			
			node.appendChild(child);
			nodes.push(node);
		});
        
		return nodes;
	}

	#MapSourceToArray() {
		let source = [];
		let selection = [];
		let items = [];
		let initialSize = this.#elementsCount;
		let targetSize = initialSize * 2;

		// Map array values to an array
		Object.value(this.#data).forEach(item => source.push(item));

		// Pick N items from source at random
		while(selection.length < initialSize) {
			let index = this.#GetNumber(source.length);
			selection.push(source.splice(index, 1));
		}

		// Duplicate selected items to form pairs
		selection = [...selection, ...selection];

		// Randomise selected items
		while(items.length < targetSize) {
			let index = this.#GetNumber(selection.length);
			items.push(selection.splice(index, 1));
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
	#timerOutput;

	constructor(timerOutputRef) {
		this.#time = 0;
		this.#timerRef = this.#Start();
		this.#timerOutput = timerOutputRef;
	}

	#Start() {
		return setInterval(() => {
			this.#time++;
			this.RenderToOutput(this.#time);
		}, 1000);
	}

	RenderToOutput(value) {
		this.#timerOutput.innerHTML = value;
	}

	Stop() {
		clearInterval(this.#timerRef);
	}
}

class GameState {
	#pairs;
    #selection;
	#score;
    #scoreUi;
    #modal;
    #gameObject;
    #gameClock;

	constructor(data, uniqueItems, playingFieldRef, scoreUiRef, timeUiRef, modalRefs) {
		this.#pairs = uniqueItems;
		this.#selection = [];
		this.#score = 0;
		this.#scoreUi = scoreUiRef;
		this.#modal = modalRefs;


		this.#gameObject = new GameElements(data, uniqueItems, playingFieldRef);
		this.#gameClock = new GameClock(timeUiRef);
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

        this.#modal[0].style.display = 'flex';
        this.#modal[1].innerHTML = currentScore;
        this.#modal[2].innerHTML = currentTime;
    }

	#UpdateScore(score) {
		this.#scoreUi.innerHTML = score;
	}

	#CheckForMatch(first, second) {
		if (first.dataset.id == second.dataset.id) {
			return true;
		} else {
			return false;
		}
	}
}