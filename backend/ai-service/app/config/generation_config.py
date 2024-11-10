class GenerationConfig:
    def __init__(self):
        self.DEFAULT_CONFIG = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 40,
            "max_output_tokens": 1024,
        }
        
        self.CODE_HINT_CONFIG = {
            "temperature": 0.7,  # More focused responses
            "top_p": 0.9,
            "top_k": 30,
            "max_output_tokens": 2048,  # Longer for detailed explanations
        }
        
        self.CODE_SOLUTION_CONFIG = {
            "temperature": 0.2,  # More deterministic for code
            "top_p": 0.9,
            "top_k": 20,
            "max_output_tokens": 1024,
        }
        
        self.CODE_TRANSLATION_CONFIG = {
            "temperature": 0.5,  # Balance between creativity and accuracy
            "top_p": 0.95,
            "top_k": 30,
            "max_output_tokens": 1024,
        }