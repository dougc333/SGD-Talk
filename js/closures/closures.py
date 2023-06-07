

def parent_fn(person):
	coins = 3
	
	def play_game():
		nonlocal coins
		coins -= 1
		if coins >= 1:
			print(f"\n {person} has {coins} coins")
		elif coins==0:
			print("zero coins")
		
	return play_game


tommy = parent_fn("Tommy")
tommy()
tommy()

jenny = parent_fn("Jenny")
jenny()

