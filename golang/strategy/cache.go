package main

type cache struct {
	storage      map[string]string
	evictionAlgo evictionAlgo
	capacity     int
	maxCapacity int
}

func initCache(e evictionAlgo) *cache{
	s:=  make(map[string] string)
	return &cache
	{
		storage:  s,
		evictionAlgo: e,
		capacity: 0,
		maxCapacity: 2,
	}
}

func (c *cache) setEvictionAlgo(e evictionAlgo) {
	c.evictionAlgo = e
}

func (c *cache) add (key, value string) {
	if c.capacity ==c.maxCapacity{
		c.evict()
	}
	c.capacity++
	c.storage[key] = value
}

func (c *cache) get(key) {
	delete(c.storage, key)
}

func (c *cache) evice(){
	c.evictionAlgo.evict(c)
	c.capacity--
}


