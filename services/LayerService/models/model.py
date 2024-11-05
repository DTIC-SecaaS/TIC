class LayerModel:
    def __init__(self, name, status):
        self.name = name
        self.status = status

    def to_dict(self):
        return {
            'name': self.name,
            'status': self.status
        }
