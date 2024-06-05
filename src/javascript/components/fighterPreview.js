import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

function createStatGauge(value) {
    const statGauge = createElement({
        tagName: 'div',
        className: 'fighter-preview___statbar-gauge'
    });

    const createMeter = () => {
        return createElement({
            tagName: 'div',
            className: 'fighter-preview____statbar-gauge-meter'
        });
    };

    let much = 0;
    if (value <= 5) {
        much = Math.floor((5 / value) * 10);
    } else if (value >= 40) {
        much = Math.floor((70 / value) * 10);
    }

    for (let index = 0; index < much; index += 1) {
        statGauge.append(createMeter());
    }

    return statGauge;
}

function createStatBar(stat, value) {
    const statElement = createElement({
        tagName: 'div',
        className: 'fighter-preview___statbar'
    });

    const statName = createElement({
        tagName: 'span',
        className: 'fighter-preview___statbar-name'
    });

    const statVal = createElement({
        tagName: 'span',
        className: 'fighter-preview___statbar-value'
    });

    const statGauge = createStatGauge(value);

    statName.innerText = `${stat}: `;
    statVal.innerText = value;

    statElement.append(statName);
    statElement.append(statVal);
    statElement.append(statGauge);

    return statElement;
}

function createFighterStatsPanel(fighter, position) {
    // _id, name, health, attack, defence
    // const {name, health, attack, defense} = fighter
    const { health, attack, defense } = fighter;
    const statsPanel = createElement({
        tagName: 'div',
        className: `fighter-preview___root-statPanel ${position}`
    });

    const healthStat = createStatBar('Health', health);
    const attackStat = createStatBar('Attack', attack);
    const defenceStat = createStatBar('Defence', defense);

    statsPanel.append(healthStat);
    statsPanel.append(attackStat);
    statsPanel.append(defenceStat);

    return statsPanel;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    async function handlePreviewImage(currFighter) {
        return createFighterImage(currFighter);
    }

    async function handlePreviewStatPanel(currFighter, currPosition) {
        return createFighterStatsPanel(currFighter, currPosition);
    }

    handlePreviewStatPanel(fighter, positionClassName).then(panel => fighterElement.append(panel));
    handlePreviewImage(fighter).then(image => fighterElement.append(image));

    return fighterElement;
}
