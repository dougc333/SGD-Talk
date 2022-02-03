source: https://www.youtube.com/watch?v=Er5K_nR5lDQ
python design patterns



if 'owner' in roledict:
  owner = roledict['owner']
else:
  owner=admin

owner = roledict.get('owner', admin)

what is python continue for? Used to get to testing several levels deep where you have to do some computation on previous test. 
can't nest the tests together in one line

for item in items:
  if is_for_sale(item):
    cost = compute_cost(item)
      if cost <=wallet.money:
        buy(item)


buy is 2 level if statements deep, replace w/continue and negate teh tests

for item in items:
  if not is_for_sale(item):
    continue
  cost = compute_cost(item)
  if cost > wallet.money:
    continue
  buy(item)


static typing vs dynamic languages
example of a commmon pattern is to write to a file instead write to an interface

public void writeZen(File out){
  out.write("stuff")
}

better to use an interface vs. class so the method can handle other types not jsut the single File type or inherited
types from File. More flexible if you want to write to a socket or as a general serializable. 

public void writeZen(IWritable out){
  out.write("this isn't python so why are we even discussing this? ")
}

python uses duck typing and doesnt require specificaiton of types in function parapmeters
 instead of static typing so we dont have to worry about this. 

def writeZen(out):
  out.write("python here")


debatable quality
add weak_refs, lazy instantiation from click library














