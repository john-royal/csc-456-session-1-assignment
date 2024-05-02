terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}


resource "vercel_project" "vercelTerraform" {
  name      = "paw-terraform"
  framework = "vite"
  git_repository = {
    type = "github"
    repo = "programmerjoban/csc-456-paw"
  }
}

