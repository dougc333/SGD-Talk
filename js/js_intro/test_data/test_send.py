import urllib3


class SendData:
    def __init__(self):
        print('init SendData')
        self.data={'1':'one','2':'two','3':'three'}
        self.http= urllib3.PoolManager()
        self.response = self.http.request('GET','http://checkip.amazonaws.com')
        add = self.response.__dict__
        print("add:",add)
        self.receive_address=None
        self.send_address=None
    def send_data(self,address):
        print("send data")
        
    def receive_address(response):
        print('receive data')
        print('decode the address to send to from here')
