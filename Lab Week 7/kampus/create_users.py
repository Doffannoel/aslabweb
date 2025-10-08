from django.contrib.auth.models import User

# Delete existing users if they exist
users_to_create = [
    {"username": "budi", "password": "budi123", "role": "MAHASISWA"},
    {"username": "sri", "password": "sri123", "role": "DOSEN"},
]

for user_data in users_to_create:
    try:
        existing_user = User.objects.get(username=user_data["username"])
        existing_user.delete()
        print(f"Deleted existing user: {user_data['username']}")
    except User.DoesNotExist:
        pass

    # Create new user
    user = User.objects.create_user(
        username=user_data["username"],
        password=user_data["password"]
    )
    user.profile.role = user_data["role"]
    user.profile.save()
    print(f"Created user: {user_data['username']} with role: {user_data['role']}")
