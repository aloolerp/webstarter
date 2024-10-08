import frappe

def after_install():
    # Assign permissions to Guest role
    assign_guest_permissions()
    
    # Create "Front User" role and assign permissions
    create_front_user_role()
    assign_front_user_permissions()
    set_default_web_settings()
    
    
def assign_guest_permissions():
    """Assign read permissions to Guest role for specific doctypes."""
    guest_role = "Guest"
    guest_doctypes = ["Blog Post", "Blog Category", "Blog Settings", "Blogger", "Web Page", "Front Page", "Web Settings"]
    
    for doctype in guest_doctypes:
        add_permission_if_not_exists(doctype, guest_role, {"read": 1})

def create_front_user_role():
    """Create the Front User role if it does not exist."""
    if not frappe.db.exists("Role", "Front User"):
        frappe.get_doc({
            "doctype": "Role",
            "role_name": "Front User"
        }).insert()

def assign_front_user_permissions():
    """Assign create, write, read, delete permissions to Front User role for specific doctypes."""
    front_user_role = "Front User"
    front_user_doctypes = ["Front Page", "Page Component", "Web Settings"]

    for doctype in front_user_doctypes:
        if frappe.db.exists("DocType", doctype):
            add_permission_if_not_exists(doctype, front_user_role, {
                "create": 1,
                "write": 1,
                "read": 1,
                "delete": 1
            })

def add_permission_if_not_exists(doctype, role, new_permissions):
    """Add permissions to a role if they do not already exist without removing existing permissions."""
    existing_perms = frappe.get_all("Custom DocPerm", filters={
        "parent": doctype,
        "role": role,
        "permlevel": 0
    }, fields=["name", "read", "write", "create", "delete"])

    # If no permissions exist, add new ones
    if not existing_perms:
        docperm = frappe.get_doc({
            "doctype": "Custom DocPerm",
            "parent": doctype,
            "parenttype": "DocType",
            "parentfield": "permissions",
            "role": role,
            "permlevel": 0,
            **new_permissions
        })
        docperm.insert()
    else:
        # Update existing permissions without removing the current ones
        for perm in existing_perms:
            docperm = frappe.get_doc("Custom DocPerm", perm["name"])
            for perm_type, value in new_permissions.items():
                if value and not docperm.get(perm_type):
                    docperm.set(perm_type, 1)
            docperm.save()


def set_default_web_settings():
    """Set default values for Web Settings after installation."""
    if frappe.db.exists("DocType", "Web Settings"):
        # Fetch the single doctype document
        web_settings = frappe.get_single("Web Settings")
       

        # Clear any existing items in top_bar_items before inserting default values
        web_settings.set("top_bar_items", [])
        web_settings.set("footer_items", [])
        web_settings.set("block_settings", [])
        web_settings.set("front_setup", [])

        # Define the default values
        default_items = [
            {"label": "Home", "url": "/home", "parent_label": ""},
            {"label": "Services", "url": "/services", "parent_label": ""},
            {"label": "Blogs", "url": "/blogs", "parent_label": ""},
            {"label": "Company", "url": "", "parent_label": ""},
            {"label": "About", "url": "/about", "parent_label": "Company"},
            {"label": "Contact", "url": "/contact", "parent_label": "Company"},
        ]

        footer_items = [
            {"label": "Links", "url": "", "parent_label": ""},
            {"label": "Services", "url": "/services", "parent_label": "Links"},
            {"label": "Projects", "url": "/projects", "parent_label": "Links"},
            {"label": "Blogs", "url": "/blogs", "parent_label": "Links"},
            {"label": "Company", "url": "", "parent_label": ""},
            {"label": "About", "url": "/about", "parent_label": "Company"},
            {"label": "Contact", "url": "/contact", "parent_label": "Company"},
        ]
        
        block_settings = [
            {"app_name": "webstarter", "app_path": "web/src/components"},
           
        ]
        front_setup = [
            {"app_name": "webstarter", "app_path": "web", "title": ".env", "extension": "local",
             "template": "VITE_SOCKET_PORT=9000 VITE_SITE_NAME='alooldevs"},
        ]
        
        # Insert default items into top_bar_items child table
        for item in default_items:
            web_settings.append("top_bar_items", item)

        for item in footer_items:
            web_settings.append("footer_items", item)
        
        for item in block_settings:
            web_settings.append("block_settings", item)

        for item in front_setup:
            web_settings.append("front_setup", item)

        # Save the document with the new values
        web_settings.save()