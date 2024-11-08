class NmapModel:
    def __init__(self, target, scan_results):
        self.target = target
        self.scan_results = scan_results

    def to_dict(self):
        return {
            'target': self.target,
            'scan_results': self.scan_results
        }
