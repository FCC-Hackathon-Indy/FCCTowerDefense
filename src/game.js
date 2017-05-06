import Boot from './GameStates/Boot';
import Preloader from './GameStates/Preloader';
import InitialGameState from './GameStates/InitialGameState';
class SimpleGame extends Phaser.Game{

    constructor() {
        super(1280, 1280, Phaser.AUTO, 'App', null);
        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('InitialGameState', InitialGameState, false);

        this.state.start('Boot');
    }

}


window.onload = () => {
    var game = new SimpleGame();
};