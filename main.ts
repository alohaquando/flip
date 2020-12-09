function New_Game () {
    led.stopAnimation()
    basic.clearScreen()
    basic.pause(1000)
    game_mode = randint(1, 3)
    if (game_mode == 1) {
        basic.showString("FLIP")
        Game_Flip()
    }
    if (game_mode == 2) {
        basic.showString("RESET")
        Game_Reset()
    }
    if (game_mode == 3) {
        basic.showString("SET")
        Game_Set()
    }
}
function Game_mode_validate () {
    if (game_mode == 1) {
        validate_Flip()
    }
    if (game_mode == 2) {
        validate_Reset()
    }
    if (game_mode == 3) {
        validate_Set()
    }
}
input.onButtonPressed(Button.A, function () {
    answer.push(1)
    AND_OR = 1
})
function Next_game () {
    game.addScore(1)
    Reset_Arrays()
    New_Game()
}
function validate_Flip () {
    for (let value = 0; value <= 3; value++) {
        if (question[value] == answer[value]) {
            game.gameOver()
            control.reset()
        }
    }
    Next_game()
}
function Prepare_answer_for_set_reset () {
    possible_index = [0, 1, 2, 3]
    possible_index.removeAt(possible_index.indexOf(bit_to_change))
    answer.reverse()
}
function Show_question () {
    basic.clearScreen()
    basic.pause(200)
    for (let index = 0; index < 4; index++) {
        question.push(randint(0, 1))
    }
    for (let index = 0; index <= 3; index++) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showNumber(question[index])
    }
}
function validate_Set () {
    Prepare_answer_for_set_reset()
    if (answer.removeAt(bit_to_change) == 1) {
        for (let index = 0; index <= 3; index++) {
            if (answer[0] == 0) {
                continue;
            } else {
                game.gameOver()
            }
        }
    } else {
        game.gameOver()
    }
    Next_game()
}
input.onButtonPressed(Button.AB, function () {
    Game_mode_validate()
})
input.onButtonPressed(Button.B, function () {
    answer.push(0)
    AND_OR = 2
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
function Game_Reset () {
    Bit_index_select()
    basic.pause(2000)
    if (AND_OR == 1) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
        game.gameOver()
    }
    answer = []
}
function Game_Flip () {
    Show_question()
}
function validate_Reset () {
    Prepare_answer_for_set_reset()
    if (answer.removeAt(bit_to_change) == 0) {
        for (let index = 0; index <= 3; index++) {
            if (answer[0] == 1) {
                continue;
            } else {
                game.gameOver()
            }
        }
    } else {
        game.gameOver()
    }
    Next_game()
}
function Reset_Arrays () {
    answer = []
    question = []
    AND_OR = 0
}
function Game_Set () {
    Bit_index_select()
    basic.pause(2000)
    answer = []
}
function Bit_index_select () {
    bit_to_change = randint(0, 3)
    basic.showString("#")
    basic.showNumber(bit_to_change)
}
let bit_to_change = 0
let possible_index: number[] = []
let question: number[] = []
let AND_OR = 0
let answer: number[] = []
let game_mode = 0
New_Game()
basic.forever(function () {
	
})
