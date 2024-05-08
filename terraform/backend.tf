terraform {
  backend "s3" {
    bucket = "terraform-state-paw-bvasquez07" 
    region = "us-east-2"
    key = "core/terraform.tfstate"
  }
}