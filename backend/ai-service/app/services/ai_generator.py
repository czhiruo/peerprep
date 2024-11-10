import os
from dotenv import load_dotenv
import vertexai
from vertexai.generative_models import GenerativeModel
from ..config.generation_config import GenerationConfig
from ..managers.prompt_manager import PromptManager

class AIGenerator:
    def __init__(self):
        load_dotenv()
        try:
            vertexai.init(
                project=os.getenv('GOOGLE_CLOUD_PROJECT'),
                location=os.getenv('GOOGLE_CLOUD_LOCATION')
            )
            self.model = GenerativeModel('gemini-1.0-pro-001')
            print("Vertex AI initialized successfully")
        except Exception as e:
            print(f"Error initializing Vertex AI: {e}")
        self.config = GenerationConfig()
        self.prompt_manager = PromptManager()
    
   
    def generate_code_hints(self, problem):
        prompt = self.prompt_manager.format_code_hint(problem)
        return self.model.generate_content(
            prompt,
            generation_config=self.config.CODE_HINT_CONFIG
        )
    
    def generate_code_approach(self, problem):
        prompt = self.prompt_manager.format_code_approach(problem)
        return self.model.generate_content(
            prompt,
            generation_config=self.config.CODE_HINT_CONFIG
        )
    
    def generate_code_solution(self, problem, language):
        prompt = self.prompt_manager.format_code_solution(problem, language)
        return self.model.generate_content(
            prompt,
            generation_config=self.config.CODE_SOLUTION_CONFIG
        )

    def generate_code_translation(self, code, source_lang, target_lang):
        prompt = self.prompt_manager.format_code_translation(
            code, source_lang, target_lang
        )
        return self.model.generate_content(
            prompt,
            generation_config=self.config.CODE_TRANSLATION_CONFIG
        )
