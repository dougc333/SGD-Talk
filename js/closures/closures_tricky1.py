

def parent_fn(person, coins):
	#coins = 3
	
	def play_game():
		nonlocal coins

		coins -= 1
		if coins >= 1:
			print(f"\n {person} has {coins} coins")
		elif coins==0:
			print(f"{person} has zero coins left!!")

	return play_game


tommy = parent_fn("Tommy",3)
tommy()
tommy()

jenny = parent_fn("Jenny",3)
jenny()

