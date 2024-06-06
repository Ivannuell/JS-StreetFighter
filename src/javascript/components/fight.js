// import controls from '../../constants/controls';

export default async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        // Start fightLoop
        // get the root element
        document.addEventListener('keydown', event => {
            if (event.code === 'KeyQ') {
                resolve(firstFighter);
            }

            if (event.code === 'KeyP') {
                resolve(secondFighter);
            }
        });
    });
}

// export function getDamage(attacker, defender) {
//     // return damage
// }

// export function getHitPower(fighter) {
//     // return hit power
// }

// export function getBlockPower(fighter) {
//     // return block power
// }
