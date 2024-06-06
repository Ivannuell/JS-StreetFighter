/* eslint-disable no-param-reassign */

import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const hitPower = fighter.attack;
    return hitPower;
}

export function getBlockPower(fighter) {
    const blockPower = fighter.defense / 2;
    return Math.round(blockPower);
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return Math.round(damage) > 0 ? Math.round(damage) : 0;
}

function reduceHealth(healthBarElement, damage) {
    if (healthBarElement.children.length === 0) return;
    for (let i = 0; i < damage; i += 1) {
        healthBarElement.removeChild(healthBarElement.lastChild);
    }
}

function checkForWinner(firstFighter, secondFighter, [firstHealthPoints, secondHealthPoints]) {
    if (firstHealthPoints <= 0) {
        return secondFighter;
    }

    if (secondHealthPoints <= 0) {
        return firstFighter;
    }
    return null;
}

export default async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const secondHealthPoints = document.getElementById('right-fighter-indicator');
        const firstHealthPoints = document.getElementById('left-fighter-indicator');

        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        const secondFighterBlocking = Math.ceil(secondFighter.defense + secondFighter.defense * 0.7);
        const firstFighterBlocking = Math.ceil(firstFighter.defense + firstFighter.defense * 0.7);

        const keysPressed = {};
        document.addEventListener('keydown', event => {
            keysPressed[event.code] = true;
            if (keysPressed[controls.PlayerOneBlock] && event.code === controls.PlayerOneAttack) {
                return;
            }
            if (keysPressed[controls.PlayerTwoBlock] && event.code === controls.PlayerTwoAttack) {
                return;
            }

            if (event.code === controls.PlayerOneAttack) {
                secondFighterHealth -= getDamage(firstFighter, secondFighter);
                // console.log(getDamage(firstFighter, secondFighter) + ' damage' + ' to ' + secondFighter.name + ' health: '  + secondFighterHealth);
                reduceHealth(secondHealthPoints, getDamage(firstFighter, secondFighter));
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (event.code === controls.PlayerTwoAttack) {
                firstFighterHealth -= getDamage(secondFighter, firstFighter);
                reduceHealth(firstHealthPoints, getDamage(secondFighter, firstFighter));
                // console.log(getDamage(secondFighter, firstFighter) + ' damage' + ' to ' + firstFighter.name + ' health: '  + firstFighterHealth);
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (event.code === controls.PlayerOneBlock) {
                firstFighter.defense = firstFighterBlocking;
                // console.log('Player One is Blocking defense: ' + firstFighter.defense);
            }

            if (event.code === controls.PlayerTwoBlock) {
                secondFighter.defense = secondFighterBlocking;
                // console.log('Player Two is Blocking defense: ' + secondFighter.defense);
            }
        });

        document.addEventListener('keyup', event => {
            if (event.code === controls.PlayerOneBlock) {
                firstFighter.defense = Math.ceil(firstFighter.defense - firstFighter.defense * 0.7);
                // console.log('Player One is not Blocking: ' + firstFighter.defense);
            }

            if (event.code === controls.PlayerTwoBlock) {
                secondFighter.defense = Math.ceil(secondFighter.defense - secondFighter.defense * 0.7);
                // console.log('Player Two is not Blocking: ' + secondFighter.defense);
            }

            delete keysPressed[event.code];
        });
    });
}

// todo: add combo attacks that deal critical damage
// todo: add attack speed (cooldown for attacks)
