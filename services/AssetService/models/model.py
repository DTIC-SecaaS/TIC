class AssetModel:
    def __init__(self, name, description, url_or_ip, status):
        self.name = name
        self.description = description
        self.url_or_ip = url_or_ip
        self.status = status

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'url_or_ip': self.url_or_ip,
            'status': self.status
        }
