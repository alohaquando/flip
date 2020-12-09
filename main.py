def on_button_pressed_a():
    answer.append(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    answer.append(0)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_pressed():
    question: List[number] = []
    basic.clear_screen()
    for index in range(4):
        question.append(randint(0, 1))
    for index2 in range(4):
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            """)
        basic.show_number(question[index2])
    game.start_countdown(50000)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

answer: List[number] = []
game.set_score(0)

def on_forever():
    pass
basic.forever(on_forever)
