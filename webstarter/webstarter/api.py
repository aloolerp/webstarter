import frappe
from frappe import _

@frappe.whitelist()
def set_default_password_and_role(doc, method):
    """
    Sets a default password and assigns the 'Blogger' role for new Frappe users.
    The default password format is 'Welcome@' followed by the user's user ID.
    """
    if not doc.__islocal:  # Only apply this logic for new users
        return
    
    # Set default password
    default_password = "Welcome@1234"
    doc.new_password = default_password
    
    # Assign "Blogger" role if not already assigned
    if "Blogger" not in [role.role for role in doc.roles]:
        doc.append("roles", {"role": "Blogger"})
    
    frappe.msgprint(f"Default password set to: {default_password}")
    
    # Optionally notify the user about their new password via email
    # frappe.sendmail(recipients=doc.email, subject="Your Account Password", message=f"Your default password is {default_password}")

# Hook this function to be triggered on user creation (in hooks.py)
# doc_events = {
#     "User": {
#         "before_insert": "your_module_path.set_default_password_and_role"
#     }
# }





@frappe.whitelist(allow_guest=True)
def get_google_social_login_key():
    """
    Fetch Google Social Login Key and return the necessary information.
    """
    try:
        provider = "Google"  # The name of the provider
        login_key = frappe.get_all(
            "Social Login Key",
            filters={"provider_name": provider, "enable_social_login": 1},
            fields=["name", "client_id", "base_url", "icon"]
        )

        # Log the retrieved keys
        frappe.log_info(f"Retrieved login keys: {login_key}")

        if not login_key:
            return {"message": "Google Social Login Key not found."}

        client_secret = get_decrypted_password("Social Login Key", login_key[0].name, "client_secret")

        # Log the client secret
        frappe.log_info(f"Client secret for {provider}: {client_secret}")

        if not client_secret:
            return {"message": "Client secret not found."}

        # Construct the response with the necessary information
        return {
            "client_id": login_key[0].client_id,
            "base_url": login_key[0].base_url,
            "icon": login_key[0].icon,
            "client_secret": client_secret
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Get Google Social Login Key Error")
        return {"message": "An error occurred while fetching the login key."}
