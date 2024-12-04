class NiktoModel:
    def __init__(self, target, scan_results, herramienta, fecha):
        self.target = target
        self.scan_results = scan_results
        self.herramienta = herramienta
        self.fecha = fecha

    def to_dict(self):
        return {
            'target': self.target,
            'scan_results': self.scan_results,
            'herramienta': self.herramienta,
            'fecha': self.fecha
        }
