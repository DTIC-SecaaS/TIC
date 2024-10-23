class AssetModel:
    def __init__(self, name, description, ip, status):
        self.name = name
        self.description = description
        self.ip = ip
        self.status = status

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'ip': self.ip,
            'status': self.status
        }
