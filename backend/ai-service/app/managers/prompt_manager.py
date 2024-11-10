# app/managers/prompt_manager.py

class PromptManager:
    def __init__(self):
        # Formatting instructions
        self.format_instructions = """
        Please format your responses using these markdown elements:
        - Use ### for section headers
        - Use **text** for bold emphasis
        - Use `code` for inline code
        - Use ``` for code blocks with language specification
        - Use bullet points for lists
        - Use > for blockquotes
        - Use tables when presenting structured data
        """

        # Template for initial hints
        self.code_hint_template = f"""
        For the following LeetCode problem, provide initial hints without revealing the complete solution:
        Problem: {{problem}}
        
        Please provide:
        1. Initial thought process
        2. Key observations
        3. Data structure suggestions
        
        Keep the hints high-level without revealing the exact implementation steps.

        {self.format_instructions}
        """
        
        # Template for detailed approach
        self.code_approach_template = f"""
        For the following LeetCode problem, provide a detailed step-by-step approach:
        Problem: {{problem}}
        
        Please break down the solution into:
        1. Algorithm steps in detail
        2. Time and space complexity analysis
        3. Optimization possibilities
        
        Focus on the logical steps without providing the actual code.

        
        {self.format_instructions}
        """
        
        # Template for solution
        self.code_solution_template = """
        Provide a clean, efficient code solution for the following LeetCode problem:
        Problem: {problem}
        Programming Language: {language}
        
        Return only the code solution without explanations, but can have comments. 
        The script should be able to run as-in any {language} IDE or environment, and should handle user input. 
        """

        # Template for translation of code
        self.code_translation_template = """
        Translate the following code from {source_lang} to {target_lang}:
        
        Original code:
        {code}
        """

    
    def format_code_hint(self, problem):
        return self.code_hint_template.format(problem=problem)
    
    def format_code_approach(self, problem):
        return self.code_approach_template.format(problem=problem)
    
    def format_code_solution(self, problem, language):
        return self.code_solution_template.format(
            problem=problem,
            language=language
        )
    def format_code_translation(self, code, source_lang, target_lang):
        return self.code_translation_template.format(
            code=code,
            source_lang=source_lang,
            target_lang=target_lang
        )