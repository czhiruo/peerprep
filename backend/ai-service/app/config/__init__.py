# app/config/__init__.py
from .generation_config import GenerationConfig

# Export what should be available when importing from this package
__all__ = ['GenerationConfig']